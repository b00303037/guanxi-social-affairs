import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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
import { VerifyReq } from 'src/app/api/models/verify.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IDNoValidator } from 'src/app/shared/validators/IDNo.validator';
import { QueryApplListStepComponent } from './query-appl-list-step/query-appl-list-step.component';
import { VerificationFCsModel, VerificationFormModel } from './query.models';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(QueryApplListStepComponent)
  queryApplListStepComponent!: QueryApplListStepComponent;

  flagsOfEditable = {
    verification: false,
  };

  // 身分認證
  verificationFG = new FormGroup({
    IDNo: new FormControl(null, [Validators.required, IDNoValidator]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    captcha: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    passed: new FormControl(false, [Validators.requiredTrue]),
  });
  verificationFCs: VerificationFCsModel = {
    IDNo: this.verificationFG.controls['IDNo'],
    password: this.verificationFG.controls['password'],
    captcha: this.verificationFG.controls['captcha'],
    passed: this.verificationFG.controls['passed'],
  };
  get verificationFV(): VerificationFormModel {
    return this.verificationFG.value;
  }

  verifying = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBarService: SnackBarService,
    private gsaService: GsaService,
    private authService: AuthService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);
  }

  ngOnInit(): void {}

  onVerificationFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.verificationFG);

    if (this.verifying || !this.checkFG(this.verificationFG, ['passed'])) {
      return;
    }
    this.verifying = true;

    const { IDNo, password, captcha } = this.verificationFV;
    const req: VerifyReq = {
      action: 'query',
      IDNo,
      password,
      captcha,
    };

    this.gsaService
      .Verify(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.verifying = false)),
        map((res) => {
          this.authService.setToken(res.content.token);

          this.verificationFCs['passed'].setValue(true);

          this.queryApplListStepComponent.onGetApplList();

          this.stepper.next();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  forceValidation(fg: FormGroup): void {
    fg.markAllAsTouched();
    fg.updateValueAndValidity();
  }

  checkFG(fg: FormGroup, skippedFCNames: Array<string> = []): boolean {
    return (
      fg.errors === null &&
      Object.entries(fg.controls)
        .filter(([name, fc]) => !skippedFCNames.includes(name))
        .every(([name, fc]) => fc.errors === null)
    );
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
