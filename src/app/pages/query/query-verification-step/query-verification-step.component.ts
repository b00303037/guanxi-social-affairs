import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-query-verification-step',
  templateUrl: './query-verification-step.component.html',
  styleUrls: ['./query-verification-step.component.scss'],
})
export class QueryVerificationStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  fcs!: {
    IDNo: AbstractControl;
    password: AbstractControl;
    captcha: AbstractControl;
    passed: AbstractControl;
  };

  showPassword = false;
  captchaImgSrc: string | undefined;

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit(): void {
    this.initFCs();
  }

  initFCs(): void {
    this.fcs = {
      IDNo: this.fg.controls['IDNo'],
      password: this.fg.controls['password'],
      captcha: this.fg.controls['captcha'],
      passed: this.fg.controls['passed'],
    };
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
