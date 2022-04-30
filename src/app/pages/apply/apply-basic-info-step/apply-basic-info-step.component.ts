import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'date-fns';
import { Settings } from 'src/app/api/models/get-settings.models';
import { GENDER_OBJ } from 'src/app/shared/enums/gender.enum';
import {
  EmailOrMobileNoErrorStateMatcher,
  TelephoneNoErrorStateMatcher,
} from 'src/app/shared/validators/basic-info-form.validators';
import { BasicInfoFCsModel } from '../apply.models';

@Component({
  selector: 'app-apply-basic-info-step',
  templateUrl: './apply-basic-info-step.component.html',
  styleUrls: ['./apply-basic-info-step.component.scss'],
})
export class ApplyBasicInfoStepComponent implements OnInit {
  @Input() IDNo!: string;
  @Input() fg!: FormGroup;
  fcs!: BasicInfoFCsModel;

  showPassword = false;
  today = new Date();
  maxRegDate = new Date();

  genderObj = GENDER_OBJ;

  emailOrMobileNoErrorStateMatcher = new EmailOrMobileNoErrorStateMatcher();
  telephoneNoErrorStateMatcher = new TelephoneNoErrorStateMatcher();

  constructor(private route: ActivatedRoute) {
    const { settings } = this.route.snapshot.data as { settings: Settings };

    this.maxRegDate = parse(
      `${settings.maxRegDate} 00:00:00 0`,
      'yyyy/MM/dd HH:mm:ss S',
      new Date()
    );
  }

  ngOnInit(): void {
    this.initFCs();
  }

  initFCs(): void {
    this.fcs = {
      newPassword: this.fg.controls['newPassword'],
      name: this.fg.controls['name'],
      gender: this.fg.controls['gender'],
      birthDate: this.fg.controls['birthDate'],
      regDate: this.fg.controls['regDate'],
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
