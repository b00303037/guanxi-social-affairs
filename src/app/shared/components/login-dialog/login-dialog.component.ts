import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { LoginReq } from 'src/app/api/models/login.models';
import { environment } from 'src/environments/environment';
import { LoginDialogData, LoginFormModel } from './login-dialog.models';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  loginFG = new FormGroup({
    role: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    captcha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });
  loginFCs = {
    role: this.loginFG.controls['role'],
    username: this.loginFG.controls['username'],
    password: this.loginFG.controls['password'],
    captcha: this.loginFG.controls['captcha'],
  };
  get loginFV(): LoginFormModel {
    return this.loginFG.value;
  }

  showPassword = false;
  captchaImgSrc: string | undefined;

  loggingIn = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackBar: MatSnackBar,
    private gsaService: GsaService
  ) {
    this.loginFCs['role'].setValue(this.data.role);

    this.refreshCaptcha();
  }

  ngOnInit(): void {
    const fv: Partial<LoginFormModel> = {
      username: this.data.role,
      password: '123456',
      captcha: '896062',
    };
    this.loginFG.patchValue(fv);
  }

  refreshCaptcha(): void {
    const url = environment.fakeData
      ? '/assets/captcha.png'
      : `${environment.baseApiUrl}/api/GetCaptcha`;
    const timestamp = new Date().valueOf();

    this.captchaImgSrc = `${url}?${timestamp}`;
  }

  onLogin(): void {
    this.loginFG.markAllAsTouched();
    this.loginFG.updateValueAndValidity();

    if (this.loggingIn || this.loginFG.invalid) {
      return;
    }
    this.loggingIn = true;

    const { role, username, password, captcha } = this.loginFV;
    const req: LoginReq = {
      role,
      username,
      password,
      captcha,
    };

    this.gsaService
      .Login(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loggingIn = false)),
        map((res) => {
          this.snackBar.open(res.message, '', { panelClass: 'success' });

          this.dialogRef.close(true);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onError(err: string): Observable<never> {
    this.snackBar.open(err, '', { panelClass: 'error' });

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
