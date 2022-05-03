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
import { ArrangeApplReq } from 'src/app/api/models/arrange-appl.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  ArrangeApplDialogData,
  ArrangeApplFCsModel,
  ArrangeApplFormModel,
} from './arrange-appl-dialog.models';

@Component({
  selector: 'app-arrange-appl-dialog',
  templateUrl: './arrange-appl-dialog.component.html',
  styleUrls: ['./arrange-appl-dialog.component.scss'],
})
export class ArrangeApplDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  fg = new FormGroup({
    scheduledDate: new FormControl(null, [Validators.required]),
  });
  fcs: ArrangeApplFCsModel = {
    scheduledDate: this.fg.controls['scheduledDate'],
  };
  get fv(): ArrangeApplFormModel {
    return this.fg.value;
  }

  arranging = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ArrangeApplDialogData,
    private dialogRef: MatDialogRef<ArrangeApplDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    const scheduledDate = this.data.scheduledDate
      ? parse(
          `${this.data.scheduledDate} 00:00:00 0`,
          'yyyy/MM/dd HH:mm:ss S',
          new Date()
        )
      : null;

    this.fcs['scheduledDate'].setValue(scheduledDate);
  }

  ngOnInit(): void {}

  onArrangeAppl(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.arranging) {
      return;
    }
    this.arranging = true;

    const { scheduledDate } = this.fv;
    const req: ArrangeApplReq = {
      applicationID: this.data.applicationID,
      scheduledDate: format(scheduledDate, 'yyyy/MM/dd'),
    };

    this.gsaService
      .ArrangeAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.arranging = false)),
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

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
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
