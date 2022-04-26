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
import { MatSnackBarModule } from '@angular/material/snack-bar';
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

// directives
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';

// pipes
import { SafeHTMLPipe } from './pipes/safe-html.pipe';

import { MatPaginatorIntl } from '@angular/material/paginator';
import {
  MatProgressSpinnerDefaultOptions,
  MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
} from '@angular/material/progress-spinner';
import {
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { PaginatorIntl } from './paginator-intl';

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
];
const DIRECTIVES = [StopPropagationDirective, UpperCaseDirective];
const PIPES = [SafeHTMLPipe];

@NgModule({
  declarations: [
    // components
    ...COMPONENTS,
    // directives
    ...DIRECTIVES,
    // pipes
    ...PIPES,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // @angular/material
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    // @angular/material-date-fns-adapter
    MatDateFnsModule,
  ],
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
  exports: [MatTooltipModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
