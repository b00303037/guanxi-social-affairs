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
import { ReviewApplReq } from 'src/app/api/models/review-appl.models';
import { ApplStatuses, APPL_STATUS_OBJ } from '../../enums/appl-status.enum';
import { SnackTypes } from '../../enums/snack-type.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import { ReviewApplDialogData } from './review-appl-dialog.models';

@Component({
  selector: 'app-review-appl-dialog',
  templateUrl: './review-appl-dialog.component.html',
  styleUrls: ['./review-appl-dialog.component.scss'],
})
export class ReviewApplDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  applStatusObj = APPL_STATUS_OBJ;

  reviewing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewApplDialogData,
    private dialogRef: MatDialogRef<ReviewApplDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {}

  onReviewAppl(applicationID: string, status: ApplStatuses): void {
    if (
      this.reviewing ||
      (status !== ApplStatuses.Y && status !== ApplStatuses.N)
    ) {
      return;
    }
    this.reviewing = true;

    const req: ReviewApplReq = {
      applicationID,
      status,
    };

    this.gsaService
      .ReviewAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.reviewing = false)),
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
