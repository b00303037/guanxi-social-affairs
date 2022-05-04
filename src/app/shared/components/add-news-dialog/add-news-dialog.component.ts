import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Editor, Toolbar, Validators as NGXValidators } from 'ngx-editor';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { AddNewsReq } from 'src/app/api/models/add-news.models';
import { getDatetime } from 'src/app/api/models/get-news.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { YN_OBJ } from '../../enums/yn.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import { getNumberList } from '../../services/utils';
import {
  EndTimeErrorStateMatcher,
  EndTimeValidator,
} from '../../validators/end-time.validator';
import {
  StartTimeErrorStateMatcher,
  StartTimeValidator,
} from '../../validators/start-time.validator';
import { AddNewsFCsModel, AddNewsFormModel } from './add-news-dialog.models';

@Component({
  selector: 'app-add-news-dialog',
  templateUrl: './add-news-dialog.component.html',
  styleUrls: ['./add-news-dialog.component.scss'],
})
export class AddNewsDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  fg = new FormGroup(
    {
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      date: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [NGXValidators.required()]),
      enabled: new FormControl(null, [Validators.required]),
      pinned: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null),
      startHours: new FormControl(null),
      startMinutes: new FormControl(null),
      endDate: new FormControl(null),
      endHours: new FormControl(null),
      endMinutes: new FormControl(null),
    },
    {
      validators: [StartTimeValidator, EndTimeValidator],
    }
  );
  fcs: AddNewsFCsModel = {
    title: this.fg.controls['title'],
    date: this.fg.controls['date'],
    content: this.fg.controls['content'],
    enabled: this.fg.controls['enabled'],
    pinned: this.fg.controls['pinned'],
    startDate: this.fg.controls['startDate'],
    startHours: this.fg.controls['startHours'],
    startMinutes: this.fg.controls['startMinutes'],
    endDate: this.fg.controls['endDate'],
    endHours: this.fg.controls['endHours'],
    endMinutes: this.fg.controls['endMinutes'],
  };
  get fv(): AddNewsFormModel {
    return this.fg.value;
  }
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    // ['underline', 'strike'],
    // ['code', 'blockquote'],
    // ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  hoursSelectList: Array<number> = getNumberList(0, 23);
  minutesSelectList: Array<number> = getNumberList(0, 55, 5);

  YNObj = YN_OBJ;

  startTimeErrorStateMatcher = new StartTimeErrorStateMatcher();
  endTimeErrorStateMatcher = new EndTimeErrorStateMatcher();

  adding = false;

  constructor(
    private dialogRef: MatDialogRef<AddNewsDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    this.fcs['startDate'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap<Date | null>((next) => {
          if (next === null) {
            this.fcs['startHours'].disable();
            this.fcs['startMinutes'].disable();
          } else {
            this.fcs['startHours'].enable();
            this.fcs['startHours'].setValue(0);
            this.fcs['startMinutes'].enable();
            this.fcs['startMinutes'].setValue(0);
          }
        })
      )
      .subscribe();

    this.fcs['endDate'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap<Date | null>((next) => {
          if (next === null) {
            this.fcs['endHours'].disable();
            this.fcs['endMinutes'].disable();
          } else {
            this.fcs['endHours'].enable();
            this.fcs['endHours'].setValue(0);
            this.fcs['endMinutes'].enable();
            this.fcs['endMinutes'].setValue(0);
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('100%');

    this.editor = new Editor();
  }

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
  }

  clearStartDateAndTime(e: Event): void {
    e.stopPropagation();

    this.fcs['startDate'].setValue(null);
    this.fcs['startHours'].setValue(undefined);
    this.fcs['startMinutes'].setValue(undefined);
  }

  clearEndDateAndTime(e: Event): void {
    e.stopPropagation();

    this.fcs['endDate'].setValue(null);
    this.fcs['endHours'].setValue(undefined);
    this.fcs['endMinutes'].setValue(undefined);
  }

  onAddNews(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.adding) {
      return;
    }
    this.adding = true;

    const { title, content, pinned, enabled } = this.fv;
    const startDatetime = getDatetime(
      this.fv.startDate,
      this.fv.startHours,
      this.fv.startMinutes
    );
    const endDatetime = getDatetime(
      this.fv.endDate,
      this.fv.endHours,
      this.fv.endMinutes
    );
    const req: AddNewsReq = {
      title,
      date: format(this.fv.date, 'yyyy/MM/dd'),
      content,
      pinned,
      enabled,
      startDatetime,
      endDatetime,
    };

    this.gsaService
      .AddNews(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.adding = false)),
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

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.editor.destroy();
  }
}
