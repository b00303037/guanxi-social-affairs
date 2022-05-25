import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isBefore, isValid } from 'date-fns';
import { startWith, Subject, takeUntil, tap } from 'rxjs';
import { HomeData } from 'src/app/api/models/get-home-data.models';
import { Settings } from 'src/app/api/models/get-settings.models';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.models';
import { IDNoHintDialogComponent } from 'src/app/shared/components/idno-hint-dialog/idno-hint-dialog.component';
import { IDNoHintDialogData } from 'src/app/shared/components/idno-hint-dialog/idno-hint-dialog.models';
import { environment } from 'src/environments/environment';
import { VerificationFCsModel } from '../apply.models';

@Component({
  selector: 'app-apply-verification-step',
  templateUrl: './apply-verification-step.component.html',
  styleUrls: ['./apply-verification-step.component.scss'],
})
export class ApplyVerificationStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  fcs!: VerificationFCsModel;

  showPassword = false;
  captchaImgSrc: string | undefined;
  launchDatetime: Date | undefined;
  applCount: number;
  yearlyApplLimit: number | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) {
    this.refreshCaptcha();

    const { homeData, settings } = this.route.snapshot.data as {
      homeData: HomeData;
      settings: Settings;
    };
    const launchDatetime = new Date(settings.launchDatetime);

    this.launchDatetime = isValid(launchDatetime) ? launchDatetime : undefined;
    this.applCount = homeData.applCount;
    this.yearlyApplLimit = Number.parseInt(settings.yearlyApplLimit, 10);
  }

  ngOnInit(): void {
    this.initFCs();

    const isFirstTime: boolean = this.fcs['isFirstTime'].value;

    this.fcs['isFirstTime'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(isFirstTime),
        tap<boolean>((next) =>
          this.fcs['password'][next ? 'disable' : 'enable']()
        )
      )
      .subscribe();

    let confirmDialogData: ConfirmDialogData | undefined;

    if (this.launchDatetime && isBefore(new Date(), this.launchDatetime)) {
      confirmDialogData = new ConfirmDialogData({
        title: '尚未開始',
        content: `線上申請將於 ${this.datePipe.transform(
          this.launchDatetime,
          'yyyy/MM/dd HH:mm'
        )} 開始`,
        closeButtonText: '',
        confirmButtonText: '返回首頁',
      });
    } else if (this.yearlyApplLimit && this.applCount >= this.yearlyApplLimit) {
      confirmDialogData = new ConfirmDialogData({
        title: '申請額滿',
        content: `今年度線上申請 ${this.decimalPipe.transform(
          this.yearlyApplLimit,
          '1.0'
        )} 件已額滿`,
        closeButtonText: '',
        confirmButtonText: '返回首頁',
      });
    }

    if (confirmDialogData !== undefined) {
      this.matDialog
        .open(ConfirmDialogComponent, { data: confirmDialogData })
        .afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            this.router.navigate(['/home']);
          })
        )
        .subscribe();
    } else {
      this.openIDNoHintDialog();
    }
  }

  initFCs(): void {
    this.fcs = {
      isFirstTime: this.fg.controls['isFirstTime'],
      IDNo: this.fg.controls['IDNo'],
      password: this.fg.controls['password'],
      captcha: this.fg.controls['captcha'],
      passed: this.fg.controls['passed'],
    };
  }

  openIDNoHintDialog(): void {
    const { settings } = this.route.snapshot.data as {
      settings: Settings;
    };

    const data: IDNoHintDialogData = {
      IDNoSuffixList: settings.IDNoSuffixList,
    };

    this.matDialog.open(IDNoHintDialogComponent, { data });
  }

  refreshCaptcha(): void {
    const url = environment.fakeData
      ? 'assets/captcha.png'
      : `${environment.baseApiUrl}/api/GetCaptcha`;
    const timestamp = new Date().valueOf();

    this.captchaImgSrc = `${url}?${timestamp}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
