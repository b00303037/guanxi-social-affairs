import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format, parse } from 'date-fns';
import {
  Subject,
  takeUntil,
  finalize,
  map,
  catchError,
  Observable,
  EMPTY,
} from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { CompleteApplReq } from 'src/app/api/models/complete-appl.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { YN_OBJ } from '../../enums/yn.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  CompleteApplFormModel,
  CompleteApplDialogData,
  CompleteApplFCsModel,
} from './complete-appl-dialog.models';

@Component({
  selector: 'app-complete-appl-dialog',
  templateUrl: './complete-appl-dialog.component.html',
  styleUrls: ['./complete-appl-dialog.component.scss'],
})
export class CompleteApplDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  fg = new FormGroup({
    completionDate: new FormControl(null, [Validators.required]),
    hasCancer: new FormControl(null, [Validators.required]),
  });
  fcs: CompleteApplFCsModel = {
    completionDate: this.fg.controls['completionDate'],
    hasCancer: this.fg.controls['hasCancer'],
  };
  get fv(): CompleteApplFormModel {
    return this.fg.value;
  }

  YNObj = YN_OBJ;

  completing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompleteApplDialogData,
    private dialogRef: MatDialogRef<CompleteApplDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    const completionDate = this.data.completionDate
      ? parse(
          `${this.data.completionDate} 00:00:00 0`,
          'yyyy/MM/dd HH:mm:ss S',
          new Date()
        )
      : null;
    const hasCancer = this.data.hasCancer ?? null;

    this.fcs['completionDate'].setValue(completionDate);
    this.fcs['hasCancer'].setValue(hasCancer);
  }

  ngOnInit(): void {}

  onCompleteAppl(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.completing) {
      return;
    }
    this.completing = true;

    const { completionDate, hasCancer } = this.fv;
    const req: CompleteApplReq = {
      applicationID: this.data.applicationID,
      completionDate: format(completionDate, 'yyyy/MM/dd'),
      hasCancer,
    };

    this.gsaService
      .CompleteAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.completing = false)),
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
