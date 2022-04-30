import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// @angular/material
import { MatButtonModule } from '@angular/material/button';
import {
  MatDateFormats,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogConfig,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import {
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatProgressSpinnerDefaultOptions,
  MatProgressSpinnerModule,
  MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatSnackBarConfig,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

// @angular/material-date-fns-adapter
import {
  MatDateFnsModule,
  DateFnsAdapter,
} from '@angular/material-date-fns-adapter';
import { zhTW } from 'date-fns/locale';

// components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ExpandedApplComponent } from './components/expanded-appl/expanded-appl.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { UpdateApplDialogComponent } from './components/update-appl-dialog/update-appl-dialog.component';
import { BasicInfoFormComponent } from './components/update-appl-dialog/basic-info-form/basic-info-form.component';
import { HCProgramFormComponent } from './components/update-appl-dialog/hcprogram-form/hcprogram-form.component';
import { IDPhotosFormComponent } from './components/update-appl-dialog/idphotos-form/idphotos-form.component';

// directives
import { ClickThrottleDirective } from './directives/click-throttle.directive';
import { MatStepperScrollerDirective } from './directives/mat-stepper-scroller.directive';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import { SubmitThrottleDirective } from './directives/submit-throttle.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';

// pipes
import { IsInSetPipe } from './pipes/is-in-set.pipe';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';

import { PaginatorIntl } from './paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';

const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'yyyy/MM/dd',
  },
  display: {
    dateInput: 'yyyy/MM/dd',
    monthYearLabel: 'yyyy MMM',
    dateA11yLabel: 'yyyy/MM/dd',
    monthYearA11yLabel: 'yyyy MMM',
  },
};
const DIALOG_DEFAULT_OPTIONS: MatDialogConfig = {
  hasBackdrop: true,
  minWidth: '240px',
  maxWidth: 'calc(100% - 2rem)',
};
const FORM_FIELD_DEFAULT_OPTIONS: MatFormFieldDefaultOptions = {
  appearance: 'fill',
};
const SNACK_BAR_DEFAULT_OPTIONS: MatSnackBarConfig = {
  duration: 4000,
};
const PROGRESS_SPINNER_DEFAULT_OPTIONS: MatProgressSpinnerDefaultOptions = {
  diameter: 40,
};

const COMPONENTS = [
  ConfirmDialogComponent,
  ExpandedApplComponent,
  LoginDialogComponent,
  SnackBarComponent,
  UpdateApplDialogComponent,
];
const DIRECTIVES = [
  ClickThrottleDirective,
  MatStepperScrollerDirective,
  StopClickPropagationDirective,
  SubmitThrottleDirective,
  UpperCaseDirective,
];
const PIPES = [IsInSetPipe, SafeHTMLPipe];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    BasicInfoFormComponent,
    HCProgramFormComponent,
    IDPhotosFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // @angular/material
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    // @angular/material-date-fns-adapter
    MatDateFnsModule,
  ],
  exports: [MatTooltipModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [
    { provide: DateAdapter, useClass: DateFnsAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: zhTW },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: DIALOG_DEFAULT_OPTIONS },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: FORM_FIELD_DEFAULT_OPTIONS,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: SNACK_BAR_DEFAULT_OPTIONS,
    },
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorIntl,
    },
    {
      provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue: PROGRESS_SPINNER_DEFAULT_OPTIONS,
    },
  ],
})
export class SharedModule {}
