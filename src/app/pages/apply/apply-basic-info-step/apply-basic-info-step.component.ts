import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GENDER_OBJ } from 'src/app/api/enums/gender.enum';
import { EmailOrMobileNoErrorStateMatcher, TelephoneNoErrorStateMatcher } from 'src/app/shared/validators/basic-info-form.validators';

@Component({
  selector: 'app-apply-basic-info-step',
  templateUrl: './apply-basic-info-step.component.html',
  styleUrls: ['./apply-basic-info-step.component.scss'],
})
export class ApplyBasicInfoStepComponent implements OnInit, OnDestroy {
  private _mobileQueryListener = () => this.changeDetectorRef.detectChanges();

  mobileQuery: MediaQueryList = this.media.matchMedia(Breakpoints.XSmall);

  @Input() fg!: FormGroup;
  @Input() fcs!: { [key: string]: AbstractControl };
  @Input() IDNo!: string;

  showPassword = false;
  today = new Date();

  genderObj = GENDER_OBJ;

  emailOrMobileNoErrorStateMatcher = new EmailOrMobileNoErrorStateMatcher();
  telephoneNoErrorStateMatcher = new TelephoneNoErrorStateMatcher();

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {}

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
