import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { startWith, Subject, takeUntil, tap } from 'rxjs';
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

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit(): void {
    this.initFCs();

    const isFirstTime = this.fcs['isFirstTime'].value;

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
