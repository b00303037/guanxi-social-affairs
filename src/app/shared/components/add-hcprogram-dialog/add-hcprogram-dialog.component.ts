import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
import { AddHCProgramReq } from 'src/app/api/models/add-hcprogram.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { YN_OBJ } from '../../enums/yn.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  AddHCProgramFCsModel,
  AddHCProgramFormModel,
} from './add-hcprogram-dialog.models';

@Component({
  selector: 'app-add-hcprogram-dialog',
  templateUrl: './add-hcprogram-dialog.component.html',
  styleUrls: ['./add-hcprogram-dialog.component.scss'],
})
export class AddHCProgramDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  fg = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl(null, [Validators.required]),
    charge: new FormControl(null, [Validators.required, Validators.min(0)]),
    enabled: new FormControl(null, [Validators.required]),
  });
  fcs: AddHCProgramFCsModel = {
    name: this.fg.controls['name'],
    description: this.fg.controls['description'],
    charge: this.fg.controls['charge'],
    enabled: this.fg.controls['enabled'],
  };
  get fv(): AddHCProgramFormModel {
    return this.fg.value;
  }

  YNObj = YN_OBJ;

  adding = false;

  constructor(
    private dialogRef: MatDialogRef<AddHCProgramDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {}

  onAddHCProgram(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.adding) {
      return;
    }
    this.adding = true;

    const { name, description, charge, enabled } = this.fv;
    const req: AddHCProgramReq = {
      name,
      description,
      charge,
      enabled,
    };

    this.gsaService
      .AddHCProgram(req)
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
  }
}
