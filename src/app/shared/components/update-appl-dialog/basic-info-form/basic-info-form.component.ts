import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GENDER_OBJ } from 'src/app/shared/enums/gender.enum';
import { VILLAGE_SELECT_LIST } from 'src/app/shared/enums/villages';
import { EmailOrMobileNoErrorStateMatcher } from 'src/app/shared/validators/email-or-mobile-no.validator';
import { TelephoneNoErrorStateMatcher } from 'src/app/shared/validators/telephone-no.validator';
import { BasicInfoFCsModel } from '../update-appl-dialog.models';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss'],
})
export class BasicInfoFormComponent implements OnInit {
  @Input() fg!: FormGroup;
  @Input() minApplAge!: number | undefined;
  @Input() maxRegDate!: Date;
  fcs!: BasicInfoFCsModel;

  showPassword = false;
  today = new Date();

  genderObj = GENDER_OBJ;
  villageSelectList = VILLAGE_SELECT_LIST;

  emailOrMobileNoErrorStateMatcher = new EmailOrMobileNoErrorStateMatcher();
  telephoneNoErrorStateMatcher = new TelephoneNoErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {
    this.initFCs();
  }

  initFCs(): void {
    this.fcs = {
      name: this.fg.controls['name'],
      gender: this.fg.controls['gender'],
      birthDate: this.fg.controls['birthDate'],
      regDate: this.fg.controls['regDate'],
      village: this.fg.controls['village'],
      address: this.fg.controls['address'],
      email: this.fg.controls['email'],
      mobileNo: this.fg.controls['mobileNo'],
      telPrefix: this.fg.controls['telPrefix'],
      telNo: this.fg.controls['telNo'],
      telExt: this.fg.controls['telExt'],
    };
  }

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
  }
}
