import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { format, parse } from 'date-fns';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Genders } from 'src/app/api/enums/gender.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { AddApplReq } from 'src/app/api/models/add-appl.models';
import { Settings } from 'src/app/api/models/get-settings.models';
import { VerifyReq } from 'src/app/api/models/verify.models';
import {
  EmailOrMobileNoValidator,
  MobileNoValidator,
  TelephoneNoValidator,
} from 'src/app/shared/validators/basic-info-form.validators';
import { IDNoValidator } from 'src/app/shared/validators/IDNo.validator';
import {
  BasicInfoFormModel,
  HCProgramFormModel,
  IDPhotosFormModel,
  VerificationFormModel,
} from './apply.models';

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
    captcha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    passed: new FormControl(false, [Validators.requiredTrue]),
  });
  verificationFCs = {
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
  HCProgramFCs = {
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
      gender: new FormControl(Genders.Male, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      regDate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.maxLength(50),
        Validators.email,
      ]),
      mobileNo: new FormControl(null, [MobileNoValidator]),
      telPrefix: new FormControl(null),
      telNo: new FormControl(null),
      telExt: new FormControl(null),
    },
    {
      validators: [EmailOrMobileNoValidator, TelephoneNoValidator],
    }
  );
  basicInfoFCs = {
    newPassword: this.basicInfoFG.controls['newPassword'],
    name: this.basicInfoFG.controls['name'],
    gender: this.basicInfoFG.controls['gender'],
    birthDate: this.basicInfoFG.controls['birthDate'],
    regDate: this.basicInfoFG.controls['regDate'],
    email: this.basicInfoFG.controls['email'],
    mobileNo: this.basicInfoFG.controls['mobileNo'],
    telephoneNo: this.basicInfoFG.controls['telephoneNo'],
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
  IDPhotosFCs = {
    imgIDA: this.IDPhotosFG.controls['imgIDA'],
    imgIDB: this.IDPhotosFG.controls['imgIDB'],
    imgBankbook: this.IDPhotosFG.controls['imgBankbook'],
    imgRegTranscript: this.IDPhotosFG.controls['imgRegTranscript'],
    passed: this.IDPhotosFG.controls['passed'],
  };
  get IDPhotosFV(): IDPhotosFormModel {
    return this.IDPhotosFG.value;
  }

  IDNoSuffixList: Array<string> = [];
  maxRegDate = new Date();

  verifying = false;
  adding = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private gsaService: GsaService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);

    const { settings } = this.route.snapshot.data as { settings: Settings };

    this.IDNoSuffixList = settings.IDNoSuffixList;
    this.maxRegDate = parse(settings.regDateMin, 'yyyy/MM/dd', new Date());
  }

  ngOnInit(): void {
    const fv: Partial<VerificationFormModel> = {
      IDNo: 'A123456789',
      captcha: '896062',
    };
    this.verificationFG.patchValue(fv);
  }

  onVerify(): void {
    if (this.verifying || !this.checkVerificationFG()) {
      return;
    }
    if (!this.checkIDNoSuffix()) {
      this.snackBar.open('目前採分流管制，敬請擇日再做申請', '', {
        panelClass: 'error',
      });
      return;
    }
    this.verifying = true;

    const { IDNo, password, captcha } = this.verificationFV;
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
          this.verificationFCs['passed'].setValue(true);
          this.basicInfoFCs['newPassword'][
            res.content.hasApplied ? 'disable' : 'enable'
          ]();

          // TODO save token

          this.stepper.next();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onAdd(): void {
    if (this.adding || !this.checkIDPhotosFG()) {
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
      email,
      mobileNo,
      telPrefix,
      telNo,
      telExt,
    } = this.basicInfoFV;
    const { imgIDA, imgIDB, imgBankbook, imgRegTranscript } = this.IDPhotosFV;
    const req: AddApplReq = {
      IDNo,
      password: (isFirstTime ? newPassword : password) as string,
      name,
      gender,
      birthDate: format(birthDate, 'yyyy/MM/dd'),
      regDate: format(regDate, 'yyyy/MM/dd'),
      email,
      mobileNo,
      telephoneNo: this.getTelephoneNo(telPrefix, telNo, telExt),
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
          this.snackBar.open(res.message, '', { panelClass: 'success' });

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

  checkVerificationFG(): boolean {
    return (
      this.verificationFG.errors === null &&
      Object.entries(this.verificationFCs)
        .filter(([key, fc]) => key !== 'passed')
        .every(([key, fc]) => fc.errors === null)
    );
  }

  checkIDNoSuffix(): boolean {
    const IDNo: string | null = this.verificationFCs['IDNo'].value;
    const suffixes = this.IDNoSuffixList[new Date().getDay()];

    return (
      IDNo === null || suffixes === '' || suffixes.includes(IDNo.slice(-1))
    );
  }

  checkIDPhotosFG(): boolean {
    return (
      this.IDPhotosFG.errors === null &&
      Object.entries(this.IDPhotosFCs)
        .filter(([key, fc]) => key !== 'passed')
        .every(([key, fc]) => fc.errors === null)
    );
  }

  getTelephoneNo(
    prefix: string | undefined,
    no: string | undefined,
    ext: string | undefined
  ): string {
    if (prefix && no) {
      return `${prefix}-${no}` + ext ? `#${ext}` : '';
    }

    return '';
  }

  onError(err: string): Observable<never> {
    this.snackBar.open(err, '', { panelClass: 'error' });

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
