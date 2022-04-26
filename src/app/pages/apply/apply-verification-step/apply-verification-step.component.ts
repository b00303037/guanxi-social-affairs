import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apply-verification-step',
  templateUrl: './apply-verification-step.component.html',
  styleUrls: ['./apply-verification-step.component.scss'],
})
export class ApplyVerificationStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  @Input() fcs!: { [key: string]: AbstractControl };

  showPassword = false;
  captchaImgSrc: string | undefined;

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit(): void {
    const isFirstTime = this.fcs['isFirstTime'].value;

    this.fcs['isFirstTime'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        startWith(isFirstTime),
        tap<boolean>((next) =>
          this.fcs['password'][next ? 'disable' : 'enable']()
        )
      )
      .subscribe();
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
