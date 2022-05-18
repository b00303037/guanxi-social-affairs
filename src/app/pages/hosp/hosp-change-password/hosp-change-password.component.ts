import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ChangePasswordReq } from 'src/app/api/models/change-password.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import {
  PasswordMatchErrorStateMatcher,
  PasswordMatchValidator,
} from 'src/app/shared/validators/password-match.validator';
import {
  ChangePasswordFCsModel,
  ChangePasswordFormModel,
} from './hosp-change-password.models';

@Component({
  selector: 'app-hosp-change-password',
  templateUrl: './hosp-change-password.component.html',
  styleUrls: ['./hosp-change-password.component.scss'],
})
export class HospChangePasswordComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  changePasswordFG = new FormGroup(
    {
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl(null),
    },
    {
      validators: [PasswordMatchValidator('newPassword', 'confirmPassword')],
    }
  );
  changePasswordFCs: ChangePasswordFCsModel = {
    username: this.changePasswordFG.controls['username'],
    password: this.changePasswordFG.controls['password'],
    newPassword: this.changePasswordFG.controls['newPassword'],
    confirmPassword: this.changePasswordFG.controls['confirmPassword'],
  };
  get changePasswordFV(): ChangePasswordFormModel {
    return this.changePasswordFG.value;
  }

  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  passwordMatchErrorStateMatcher = new PasswordMatchErrorStateMatcher();

  changing = false;

  constructor(
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {}

  onChangePassword(): void {
    this.changePasswordFG.markAllAsTouched();
    this.changePasswordFG.updateValueAndValidity();

    if (this.changePasswordFG.invalid || this.changing) {
      return;
    }
    this.changing = true;

    const { username, password, newPassword } = this.changePasswordFV;
    const req: ChangePasswordReq = {
      role: 'hosp',
      username,
      password,
      newPassword,
    };

    this.gsaService
      .ChangePassword(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.changing = false)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.changePasswordFG.reset();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
