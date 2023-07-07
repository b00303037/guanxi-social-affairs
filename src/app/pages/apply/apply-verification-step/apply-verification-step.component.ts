import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { startWith, Subject, takeUntil, tap } from 'rxjs';
import { Settings } from 'src/app/api/models/get-settings.models';
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

  constructor(private route: ActivatedRoute, private matDialog: MatDialog) {
    this.refreshCaptcha();
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

    if (settings.IDNoSuffixList.some((suffix) => suffix?.length)) {
      const data: IDNoHintDialogData = {
        IDNoSuffixList: settings.IDNoSuffixList,
      };

      this.matDialog.open(IDNoHintDialogComponent, { data });
    }
  }

  refreshCaptcha(): void {
    const url = environment.mockData
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
