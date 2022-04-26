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
  @Input() fcs!: { [key: string]: AbstractControl };

  showPassword = false;
  captchaImgSrc: string | undefined;

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit(): void {}

  refreshCaptcha(): void {
    const url = environment.fakeData
      ? '/assets/captcha.png'
      : `${environment.baseApiUrl}/api/GetCaptcha`;
    const timestamp = new Date().valueOf();

    this.captchaImgSrc = `${url}?${timestamp}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
