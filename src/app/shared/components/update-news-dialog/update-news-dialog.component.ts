import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format, parse } from 'date-fns';
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
import {
  getDatetime,
  GetNewsReq,
  News,
} from 'src/app/api/models/get-news.models';
import { UpdateNewsReq } from 'src/app/api/models/update-news.models';
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
import {
  UpdateNewsFCsModel,
  UpdateNewsFormModel,
  UpdateNewsDialogData,
} from './update-news-dialog.models';

@Component({
  selector: 'app-update-news-dialog',
  templateUrl: './update-news-dialog.component.html',
  styleUrls: ['./update-news-dialog.component.scss'],
})
export class UpdateNewsDialogComponent implements OnInit, OnDestroy {
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
  fcs: UpdateNewsFCsModel = {
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
  get fv(): UpdateNewsFormModel {
    return this.fg.value;
  }
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  news: News | undefined;

  hoursSelectList: Array<number> = getNumberList(0, 23);
  minutesSelectList: Array<number> = getNumberList(0, 55, 5);

  YNObj = YN_OBJ;

  startTimeErrorStateMatcher = new StartTimeErrorStateMatcher();
  endTimeErrorStateMatcher = new EndTimeErrorStateMatcher();

  getting = false;
  updating = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateNewsDialogData,
    private dialogRef: MatDialogRef<UpdateNewsDialogComponent>,
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

    this.onGetNews(this.data.newsID);
  }

  onGetNews(newsID: number): void {
    if (this.getting) {
      return;
    }
    this.getting = true;

    const req: GetNewsReq = {
      newsID: newsID,
    };
    this.gsaService
      .GetNews(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          const news = res.content;

          this.news = news;

          this.patchFV(news);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  patchFV(news: News): void {
    const {
      title,
      date,
      content,
      pinned,
      enabled,
      startDatetime,
      endDatetime,
    } = news;
    const startDate = startDatetime ? new Date(startDatetime) : undefined;
    const endDate = endDatetime ? new Date(endDatetime) : undefined;

    const fv: UpdateNewsFormModel = {
      title,
      date: parse(`${date} 00:00:00 0`, 'yyyy/MM/dd HH:mm:ss S', new Date()),
      content,
      pinned,
      enabled,
      startDate,
      startHours: startDate?.getHours(),
      startMinutes: startDate?.getMinutes(),
      endDate,
      endHours: endDate?.getHours(),
      endMinutes: endDate?.getMinutes(),
    };
    this.fg.patchValue(fv);
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

  onUpdateNews(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.updating || this.news === undefined) {
      return;
    }
    this.updating = true;

    const req: UpdateNewsReq = { newsID: this.news.newsID };

    this.patchUpdateNewsReq(req, this.news, this.fv);
    if (Object.keys(req).length === 1) {
      const snack = new Snack({
        message: '沒有異動的資料',
      });
      this.snackBarService.add(snack);

      this.updating = false;
      return;
    }

    this.gsaService
      .UpdateNews(req)
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

  patchUpdateNewsReq(
    req: UpdateNewsReq,
    news: News,
    fv: UpdateNewsFormModel
  ): UpdateNewsReq {
    const date = format(fv.date, 'yyyy/MM/dd');
    const startDatetime = getDatetime(
      fv.startDate,
      fv.startHours,
      fv.startMinutes
    );
    const endDatetime = getDatetime(fv.endDate, fv.endHours, fv.endMinutes);

    if (news.title !== fv.title) {
      req.title = fv.title;
    }
    if (news.date !== date) {
      req.date = date;
    }
    if (news.content !== fv.content) {
      req.content = fv.content;
    }
    if (news.pinned !== fv.pinned) {
      req.pinned = fv.pinned;
    }
    if (news.enabled !== fv.enabled) {
      req.enabled = fv.enabled;
    }
    if (news.startDatetime !== startDatetime) {
      req.startDatetime = startDatetime;
    }
    if (news.endDatetime !== endDatetime) {
      req.endDatetime = endDatetime;
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

    this.editor.destroy();
  }
}
