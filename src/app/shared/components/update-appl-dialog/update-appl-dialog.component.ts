import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { GsaService } from 'src/app/api/gsa.service';
import {
  Appl,
  findHCProgram,
  GetApplReq,
  getTelephoneNo,
  getTelPrefixNoExt,
} from 'src/app/api/models/get-appl.models';
import { HospDataHCProgram } from 'src/app/api/models/get-hosp-data.models';
import { UpdateApplReq } from 'src/app/api/models/update-appl.models';
import { GENDER_OBJ } from '../../enums/gender.enum';
import { SnackTypes } from '../../enums/snack-type.enum';
import { YN_OBJ } from '../../enums/yn.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  EmailOrMobileNoErrorStateMatcher,
  EmailOrMobileNoValidator,
} from '../../validators/email-or-mobile-no.validator';
import { mobileNoRegExp } from '../../validators/mobile-no.validator';
import {
  TelephoneNoErrorStateMatcher,
  TelephoneNoValidator,
} from '../../validators/telephone-no.validator';
import { DateRangeValidator } from '../../validators/validator-utils';
import {
  BasicInfoFCsModel,
  BasicInfoFormModel,
  HCProgramFCsModel,
  HCProgramFormModel,
  IDPhotosFCsModel,
  IDPhotosFormModel,
  UpdateApplDialogData,
} from './update-appl-dialog.models';

@Component({
  selector: 'app-update-appl-dialog',
  templateUrl: './update-appl-dialog.component.html',
  styleUrls: ['./update-appl-dialog.component.scss'],
})
export class UpdateApplDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  tabLabels: Array<string> = ['健檢項目', '資料填寫', '文件上傳'];
  selectedIndex = 0;

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
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      gender: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      regDate: new FormControl(null, [Validators.required]),
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
    name: this.basicInfoFG.controls['name'],
    gender: this.basicInfoFG.controls['gender'],
    birthDate: this.basicInfoFG.controls['birthDate'],
    regDate: this.basicInfoFG.controls['regDate'],
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
  });
  IDPhotosFCs: IDPhotosFCsModel = {
    imgIDA: this.IDPhotosFG.controls['imgIDA'],
    imgIDB: this.IDPhotosFG.controls['imgIDB'],
    imgBankbook: this.IDPhotosFG.controls['imgBankbook'],
    imgRegTranscript: this.IDPhotosFG.controls['imgRegTranscript'],
  };
  get IDPhotosFV(): IDPhotosFormModel {
    return this.IDPhotosFG.value;
  }

  appl: Appl | undefined;

  maxRegDate = new Date();
  maxImgSizeMB = Number.POSITIVE_INFINITY;

  YNObj = YN_OBJ;
  genderObj = GENDER_OBJ;

  emailOrMobileNoErrorStateMatcher = new EmailOrMobileNoErrorStateMatcher();
  telephoneNoErrorStateMatcher = new TelephoneNoErrorStateMatcher();

  getting = false;
  updating = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateApplDialogData,
    private dialogRef: MatDialogRef<UpdateApplDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService,
    private currencyPipe: CurrencyPipe
  ) {
    this.maxRegDate = parse(
      `${data.settings.maxRegDate} 00:00:00 0`,
      'yyyy/MM/dd HH:mm:ss S',
      new Date()
    );
    this.maxImgSizeMB =
      parseInt(data.settings.maxImgSizeMB) || this.maxImgSizeMB;

    this.basicInfoFCs['regDate'].addValidators([
      DateRangeValidator({ max: this.maxRegDate }),
    ]);
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('100%');

    this.onGetAppl(this.data.applicationID);
  }

  onGetAppl(applicationID: string): void {
    if (this.getting) {
      return;
    }
    this.getting = true;

    const req: GetApplReq = {
      applicationID,
    };
    this.gsaService
      .GetAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          const appl = res.content;

          this.appl = appl;
          this.patchHCProgramFV(appl);
          this.patchBasicInfoFV(appl);
          this.patchIDPhotosFV(appl);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  patchHCProgramFV(appl: Appl): void {
    const { hospitalID, programID } = appl;
    const program = findHCProgram(programID, this.data.hospData.HCProgramList);

    const fv: HCProgramFormModel = {
      hospitalID,
      programID,
      programName: program?.name ?? '',
      programCharge:
        this.currencyPipe.transform(program?.charge, 'TWD', 'code', '1.0-2') ??
        '',
    };
    this.HCProgramFG.patchValue(fv);
  }

  patchBasicInfoFV(appl: Appl): void {
    const { name, gender, birthDate, regDate, email, mobileNo, telephoneNo } =
      appl;
    const [telPrefix, telNo, telExt] = getTelPrefixNoExt(telephoneNo);

    const fv: BasicInfoFormModel = {
      name,
      gender,
      birthDate: parse(
        `${birthDate} 00:00:00 0`,
        'yyyy/MM/dd HH:mm:ss S',
        new Date()
      ),
      regDate: parse(
        `${regDate} 00:00:00 0`,
        'yyyy/MM/dd HH:mm:ss S',
        new Date()
      ),
      email,
      mobileNo,
      telPrefix,
      telNo,
      telExt,
    };
    this.basicInfoFG.patchValue(fv);
  }

  patchIDPhotosFV(appl: Appl): void {
    const { imgIDA, imgIDB, imgBankbook, imgRegTranscript } = appl;

    const fv: IDPhotosFormModel = {
      imgIDA,
      imgIDB,
      imgBankbook,
      imgRegTranscript,
    };
    this.IDPhotosFG.patchValue(fv);
  }

  onSelectProgram(program: HospDataHCProgram): void {
    const { programID, name, charge } = program;

    this.HCProgramFCs['programID'].setValue(programID);
    this.HCProgramFCs['programName'].setValue(name);
    this.HCProgramFCs['programCharge'].setValue(
      this.currencyPipe.transform(charge, 'TWD', 'code', '1.0-2')
    );
  }

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
  }

  onUpdateAppl(): void {
    this.forceValidation(this.HCProgramFG);
    this.forceValidation(this.basicInfoFG);
    this.forceValidation(this.IDPhotosFG);

    const invalidFGIndex = [
      this.HCProgramFG.invalid,
      this.basicInfoFG.invalid,
      this.IDPhotosFG.invalid,
    ].indexOf(true);
    if (invalidFGIndex !== -1) {
      this.selectedIndex = invalidFGIndex;
      return;
    }
    if (this.updating || this.appl === undefined) {
      return;
    }
    this.updating = true;

    const req: UpdateApplReq = { applicationID: this.appl.applicationID };

    this.patchUpdateApplReq(req, this.appl, {
      HCProgramFV: this.HCProgramFV,
      basicInfoFV: this.basicInfoFV,
      IDPhotosFV: this.IDPhotosFV,
    });
    if (Object.keys(req).length === 1) {
      const snack = new Snack({
        message: '沒有異動的資料',
      });
      this.snackBarService.add(snack);

      this.updating = false;
      return;
    }

    this.gsaService
      .UpdateAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.updating = false)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.dialogRef.close(true);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  forceValidation(fg: FormGroup): void {
    fg.markAllAsTouched();
    fg.updateValueAndValidity();
  }

  patchUpdateApplReq(
    req: UpdateApplReq,
    appl: Appl,
    fvs: {
      HCProgramFV: HCProgramFormModel;
      basicInfoFV: BasicInfoFormModel;
      IDPhotosFV: IDPhotosFormModel;
    }
  ): UpdateApplReq {
    const { programID } = fvs.HCProgramFV;
    const { name, gender, telPrefix, telNo, telExt, email, mobileNo } =
      fvs.basicInfoFV;
    const { imgIDA, imgIDB, imgBankbook, imgRegTranscript } = fvs.IDPhotosFV;

    const birthDate = format(fvs.basicInfoFV.birthDate, 'yyyy/MM/dd');
    const regDate = format(fvs.basicInfoFV.regDate, 'yyyy/MM/dd');
    const telephoneNo = getTelephoneNo(telPrefix, telNo, telExt);

    if (appl.name !== name) {
      req.name = name;
    }
    if (appl.gender !== gender) {
      req.gender = gender;
    }
    if (appl.birthDate !== birthDate) {
      req.birthDate = birthDate;
    }
    if (appl.regDate !== regDate) {
      req.regDate = regDate;
    }
    if (appl.email !== email) {
      req.email = email;
    }
    if (appl.mobileNo !== mobileNo) {
      req.mobileNo = mobileNo;
    }
    if (appl.telephoneNo !== telephoneNo) {
      req.telephoneNo = telephoneNo;
    }
    if (appl.imgIDA !== imgIDA) {
      req.imgIDA = imgIDA;
    }
    if (appl.imgIDB !== imgIDB) {
      req.imgIDB = imgIDB;
    }
    if (appl.imgBankbook !== imgBankbook) {
      req.imgBankbook = imgBankbook;
    }
    if (appl.imgRegTranscript !== imgRegTranscript) {
      req.imgRegTranscript = imgRegTranscript;
    }
    if (appl.programID !== programID) {
      req.programID = programID;
    }

    return req;
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
