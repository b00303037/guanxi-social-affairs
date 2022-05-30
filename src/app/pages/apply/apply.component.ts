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
import { ActivatedRoute } from '@angular/router';
import { format, isValid, parse, sub } from 'date-fns';
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
import { AddApplReq } from 'src/app/api/models/add-appl.models';
import { Settings } from 'src/app/api/models/get-settings.models';
import { VerifyReq } from 'src/app/api/models/verify.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IDNoValidator } from 'src/app/shared/validators/IDNo.validator';
import {
  BasicInfoFCsModel,
  BasicInfoFormModel,
  HCProgramFCsModel,
  HCProgramFormModel,
  IDPhotosFCsModel,
  IDPhotosFormModel,
  VerificationFCsModel,
  VerificationFormModel,
} from './apply.models';
import { DateRangeValidator } from 'src/app/shared/validators/validator-utils';
import { getTelephoneNo } from 'src/app/api/models/get-appl.models';
import { mobileNoRegExp } from 'src/app/shared/validators/mobile-no.validator';
import { EmailOrMobileNoValidator } from 'src/app/shared/validators/email-or-mobile-no.validator';
import { TelephoneNoValidator } from 'src/app/shared/validators/telephone-no.validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  @ViewChild(MatStepper) stepper!: MatStepper;

  flagsOfEditable = {
    verification: false,
    HCProgram: true,
    basicInfo: true,
    IDPhotos: true,
  };

  // 身分認證
  verificationFG = new FormGroup({
    isFirstTime: new FormControl(true, [Validators.required]),
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
    isFirstTime: this.verificationFG.controls['isFirstTime'],
    IDNo: this.verificationFG.controls['IDNo'],
    password: this.verificationFG.controls['password'],
    captcha: this.verificationFG.controls['captcha'],
    passed: this.verificationFG.controls['passed'],
  };
  get verificationFV(): VerificationFormModel {
    return this.verificationFG.value;
  }

  // 健檢項目
  HCProgramFG = new FormGroup({
    hospitalID: new FormControl(null, [Validators.required]),
    programID: new FormControl(null, [Validators.required]),
    programName: new FormControl(null, [Validators.required]),
    programCharge: new FormControl(null, [Validators.required]),
  });
  HCProgramFCs: HCProgramFCsModel = {
    hospitalID: this.HCProgramFG.controls['hospitalID'],
    programID: this.HCProgramFG.controls['programID'],
    programName: this.HCProgramFG.controls['programName'],
    programCharge: this.HCProgramFG.controls['programCharge'],
  };
  get HCProgramFV(): HCProgramFormModel {
    return this.HCProgramFG.value;
  }

  // 資料填寫
  basicInfoFG = new FormGroup(
    {
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      gender: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      regDate: new FormControl(null, [Validators.required]),
      village: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [
        Validators.maxLength(50),
        Validators.email,
      ]),
      mobileNo: new FormControl(null, [Validators.pattern(mobileNoRegExp)]),
      telPrefix: new FormControl(null, [Validators.maxLength(3)]),
      telNo: new FormControl(null, [Validators.maxLength(8)]),
      telExt: new FormControl(null, [Validators.maxLength(6)]),
    },
    {
      validators: [EmailOrMobileNoValidator, TelephoneNoValidator],
    }
  );
  basicInfoFCs: BasicInfoFCsModel = {
    newPassword: this.basicInfoFG.controls['newPassword'],
    name: this.basicInfoFG.controls['name'],
    gender: this.basicInfoFG.controls['gender'],
    birthDate: this.basicInfoFG.controls['birthDate'],
    regDate: this.basicInfoFG.controls['regDate'],
    village: this.basicInfoFG.controls['village'],
    address: this.basicInfoFG.controls['address'],
    email: this.basicInfoFG.controls['email'],
    mobileNo: this.basicInfoFG.controls['mobileNo'],
    telPrefix: this.basicInfoFG.controls['telPrefix'],
    telNo: this.basicInfoFG.controls['telNo'],
    telExt: this.basicInfoFG.controls['telExt'],
  };
  get basicInfoFV(): BasicInfoFormModel {
    return this.basicInfoFG.value;
  }

  // 文件上傳
  IDPhotosFG = new FormGroup({
    imgIDA: new FormControl(null, [Validators.required]),
    imgIDB: new FormControl(null, [Validators.required]),
    imgBankbook: new FormControl(null, [Validators.required]),
    imgRegTranscript: new FormControl(null, [Validators.required]),
    passed: new FormControl(false, [Validators.requiredTrue]),
  });
  IDPhotosFCs: IDPhotosFCsModel = {
    imgIDA: this.IDPhotosFG.controls['imgIDA'],
    imgIDB: this.IDPhotosFG.controls['imgIDB'],
    imgBankbook: this.IDPhotosFG.controls['imgBankbook'],
    imgRegTranscript: this.IDPhotosFG.controls['imgRegTranscript'],
    passed: this.IDPhotosFG.controls['passed'],
  };
  get IDPhotosFV(): IDPhotosFormModel {
    return this.IDPhotosFG.value;
  }

  acceptedIDNoSuffix: string = '';
  minApplAge: number | undefined;
  maxBirthDate: Date | undefined;
  maxRegDate = new Date();

  verifying = false;
  adding = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private gsaService: GsaService,
    private authService: AuthService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);

    const { settings } = this.route.snapshot.data as { settings: Settings };

    // acceptedIDNoSuffix
    this.acceptedIDNoSuffix =
      settings.IDNoSuffixList[new Date().getDay()] ?? '';

    // minApplAge & maxBirthDate
    const minApplAge = Number.parseInt(settings.minApplAge, 10);
    this.minApplAge = Number.isNaN(minApplAge) ? undefined : minApplAge;
    this.maxBirthDate = Number.isNaN(minApplAge)
      ? undefined
      : sub(new Date(), { years: minApplAge });

    // maxRegDate
    const maxRegDate = parse(
      `${settings.maxRegDate} 00:00:00 0`,
      'yyyy/MM/dd HH:mm:ss S',
      new Date()
    );
    this.maxRegDate = isValid(maxRegDate) ? maxRegDate : this.maxRegDate;

    if (this.maxBirthDate !== undefined) {
      this.basicInfoFCs['birthDate'].addValidators([
        DateRangeValidator({ max: this.maxBirthDate }),
      ]);
    }
    this.basicInfoFCs['regDate'].addValidators([
      DateRangeValidator({ max: this.maxRegDate }),
    ]);
  }

  ngOnInit(): void {}

  onVerificationFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.verificationFG);

    if (!this.checkIDNoSuffix()) {
      const snack = new Snack({
        message: '目前採分流管制，敬請擇日再做申請',
        type: SnackTypes.Error,
      });
      this.snackBarService.add(snack);
      return;
    }
    if (this.verifying || !this.checkFG(this.verificationFG, ['passed'])) {
      return;
    }
    this.verifying = true;

    const { isFirstTime, IDNo, password, captcha } = this.verificationFV;
    const req: VerifyReq = {
      action: 'apply',
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
          this.basicInfoFCs['newPassword'][
            isFirstTime ? 'enable' : 'disable'
          ]();

          this.stepper.next();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onHCProgramFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.HCProgramFG);

    this.stepper.next();
  }

  onBasicInfoFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.basicInfoFG);

    if (!this.checkBirthDate()) {
      const message = `未符合申請資格，申請人須年滿 ${this.minApplAge} 歲`;
      const snack = new Snack({ message, type: SnackTypes.Error });
      this.snackBarService.add(snack);
      return;
    }
    if (!this.checkRegDate()) {
      const message = `未符合申請資格，設籍日期須早於 ${format(
        this.maxRegDate,
        'yyyy/MM/dd'
      )}`;
      const snack = new Snack({ message, type: SnackTypes.Error });
      this.snackBarService.add(snack);
      return;
    }
    if (!this.checkFG(this.basicInfoFG)) {
      return;
    }

    this.stepper.next();
  }

  onIDPhotosFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.IDPhotosFG);

    if (this.adding || !this.checkFG(this.IDPhotosFG, ['passed'])) {
      return;
    }
    this.adding = true;

    const { isFirstTime, IDNo, password } = this.verificationFV;
    const { programID } = this.HCProgramFV;
    const {
      newPassword,
      name,
      gender,
      birthDate,
      regDate,
      village,
      address,
      email,
      mobileNo,
      telPrefix,
      telNo,
      telExt,
    } = this.basicInfoFV;
    const { imgIDA, imgIDB, imgBankbook, imgRegTranscript } = this.IDPhotosFV;
    const req: AddApplReq = {
      IDNo,
      password: isFirstTime ? newPassword : password,
      name,
      gender,
      birthDate: format(birthDate, 'yyyy/MM/dd'),
      regDate: format(regDate, 'yyyy/MM/dd'),
      village,
      address,
      email,
      mobileNo,
      telephoneNo: getTelephoneNo(telPrefix, telNo, telExt),
      imgIDA,
      imgIDB,
      imgBankbook,
      imgRegTranscript,
      programID,
    };

    this.gsaService
      .AddAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.adding = false)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.IDPhotosFCs['passed'].setValue(true);

          this.flagsOfEditable.HCProgram = false;
          this.flagsOfEditable.basicInfo = false;
          this.flagsOfEditable.IDPhotos = false;

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

  checkIDNoSuffix(): boolean {
    const IDNo: string | null = this.verificationFCs['IDNo'].value;

    return (
      IDNo === null ||
      this.acceptedIDNoSuffix === '' ||
      this.acceptedIDNoSuffix.includes(IDNo.slice(-1))
    );
  }

  checkBirthDate(): boolean {
    return !this.basicInfoFCs['birthDate'].hasError('dateRange');
  }

  checkRegDate(): boolean {
    return !this.basicInfoFCs['regDate'].hasError('dateRange');
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
