import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// ngx-editor
import { NgxEditorConfig, NgxEditorModule } from 'ngx-editor';

// @angular/material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatProgressSpinnerDefaultOptions,
  MatProgressSpinnerModule,
  MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
} from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBarConfig,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

// @angular/material-date-fns-adapter
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { zhTW } from 'date-fns/locale';

// components
import { AddHCProgramDialogComponent } from './components/add-hcprogram-dialog/add-hcprogram-dialog.component';
import { AddNewsDialogComponent } from './components/add-news-dialog/add-news-dialog.component';
import { ApplListPickerComponent } from './components/appl-list-picker/appl-list-picker.component';
import { ArrangeApplDialogComponent } from './components/arrange-appl-dialog/arrange-appl-dialog.component';
import { CancelApplDialogComponent } from './components/cancel-appl-dialog/cancel-appl-dialog.component';
import { CompleteApplDialogComponent } from './components/complete-appl-dialog/complete-appl-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ExpandedApplComponent } from './components/expanded-appl/expanded-appl.component';
import { IDNoHintDialogComponent } from './components/idno-hint-dialog/idno-hint-dialog.component';
import { ReviewApplDialogComponent } from './components/review-appl-dialog/review-appl-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { UpdateApplDialogComponent } from './components/update-appl-dialog/update-appl-dialog.component';
import { BasicInfoFormComponent } from './components/update-appl-dialog/basic-info-form/basic-info-form.component';
import { HCProgramFormComponent } from './components/update-appl-dialog/hcprogram-form/hcprogram-form.component';
import { IDPhotosFormComponent } from './components/update-appl-dialog/idphotos-form/idphotos-form.component';
import { UpdateHCProgramDialogComponent } from './components/update-hcprogram-dialog/update-hcprogram-dialog.component';
import { UpdateNewsDialogComponent } from './components/update-news-dialog/update-news-dialog.component';

// directives
import { AutofocusDirective } from './directives/autofocus.directive';
import { ClickThrottleDirective } from './directives/click-throttle.directive';
import { MatStepperScrollerDirective } from './directives/mat-stepper-scroller.directive';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import { SubmitThrottleDirective } from './directives/submit-throttle.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';

// pipes
import { IncludesApplPipe } from './pipes/includes-appl.pipe';
import { IsInSetPipe } from './pipes/is-in-set.pipe';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';

import { PaginatorIntl } from './paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TWDateFnsAdapter } from './services/tw-date-fns.adapter';

const EDITOR_CONFIG: NgxEditorConfig = {
  locals: {
    // menu
    bold: '粗體',
    italic: '斜體',
    code: '程式碼',
    underline: '底線',
    strike: '刪除線',
    blockquote: '引用',
    bullet_list: '無序清單',
    ordered_list: '有序清單',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: '靠左對齊',
    align_center: '置中',
    align_right: '靠右對齊',
    align_justify: '左右對齊',
    text_color: '文字顏色',
    background_color: '背景顏色',
    insertLink: '插入連結',
    removeLink: '移除連結',
    insertImage: '插入圖片',

    // pupups, forms, others...
    url: 'URL',
    text: '文字',
    openInNewTab: '在新分頁中開啟',
    insert: '插入',
    altText: '圖片替代文字',
    title: '圖片標題',
    remove: '移除',
  },
};

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
  disableClose: true,
  hasBackdrop: true,
  maxWidth: 'min(calc(100% - 2rem), 1280px)',
  width: '320px',
};
const FORM_FIELD_DEFAULT_OPTIONS: MatFormFieldDefaultOptions = {
  appearance: 'fill',
};
const SNACK_BAR_DEFAULT_OPTIONS: MatSnackBarConfig = {
  duration: 4000,
  horizontalPosition: 'center',
  verticalPosition: 'top',
};
const PROGRESS_SPINNER_DEFAULT_OPTIONS: MatProgressSpinnerDefaultOptions = {
  diameter: 40,
};

const COMPONENTS = [
  AddHCProgramDialogComponent,
  AddNewsDialogComponent,
  ApplListPickerComponent,
  ArrangeApplDialogComponent,
  CancelApplDialogComponent,
  CompleteApplDialogComponent,
  ConfirmDialogComponent,
  ExpandedApplComponent,
  IDNoHintDialogComponent,
  ReviewApplDialogComponent,
  LoginDialogComponent,
  SnackBarComponent,
  UpdateApplDialogComponent,
  UpdateHCProgramDialogComponent,
  UpdateNewsDialogComponent,
];
const DIRECTIVES = [
  AutofocusDirective,
  ClickThrottleDirective,
  MatStepperScrollerDirective,
  StopClickPropagationDirective,
  SubmitThrottleDirective,
  UpperCaseDirective,
];
const PIPES = [IncludesApplPipe, IsInSetPipe, SafeHTMLPipe];

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
    RouterModule,
    ReactiveFormsModule,
    // ngx-editor
    NgxEditorModule.forRoot(EDITOR_CONFIG),
    // @angular/material
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    // @angular/material-date-fns-adapter
    MatDateFnsModule,
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [
    { provide: DateAdapter, useClass: TWDateFnsAdapter },
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
