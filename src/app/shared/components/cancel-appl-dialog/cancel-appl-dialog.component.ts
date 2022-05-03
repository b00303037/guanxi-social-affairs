import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { CancelApplReq } from 'src/app/api/models/cancel-appl.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import { CancelApplDialogData } from './cancel-appl-dialog.models';

@Component({
  selector: 'app-cancel-appl-dialog',
  templateUrl: './cancel-appl-dialog.component.html',
  styleUrls: ['./cancel-appl-dialog.component.scss'],
})
export class CancelApplDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  cancelling = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CancelApplDialogData,
    private dialogRef: MatDialogRef<CancelApplDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {}

  onCancelAppl(applicationID: string): void {
    if (this.cancelling) {
      return;
    }
    this.cancelling = true;

    const req: CancelApplReq = {
      applicationID,
    };

    this.gsaService
      .CancelAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.cancelling = false)),
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
  }
}
