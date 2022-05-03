import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { HospDataHCProgram } from 'src/app/api/models/get-hosp-data.models';
import { UpdateHCProgramReq } from 'src/app/api/models/update-hcprogram.models';
import { SnackTypes } from '../../enums/snack-type.enum';
import { YN_OBJ } from '../../enums/yn.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  UpdateHCProgramFCsModel,
  UpdateHCProgramFormModel,
  UpdateHCProgramDialogData,
} from './update-hcprogram-dialog.models';

@Component({
  selector: 'app-update-hcprogram-dialog',
  templateUrl: './update-hcprogram-dialog.component.html',
  styleUrls: ['./update-hcprogram-dialog.component.scss'],
})
export class UpdateHCProgramDialogComponent implements OnInit, OnDestroy {
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
  fcs: UpdateHCProgramFCsModel = {
    name: this.fg.controls['name'],
    description: this.fg.controls['description'],
    charge: this.fg.controls['charge'],
    enabled: this.fg.controls['enabled'],
  };
  get fv(): UpdateHCProgramFormModel {
    return this.fg.value;
  }

  YNObj = YN_OBJ;

  updating = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateHCProgramDialogData,
    private dialogRef: MatDialogRef<UpdateHCProgramDialogComponent>,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    const { name, description, charge, enabled } = this.data.program;

    const fv: UpdateHCProgramFormModel = {
      name,
      description,
      charge,
      enabled,
    };

    this.fg.patchValue(fv);
  }

  ngOnInit(): void {}

  onUpdateHCProgram(): void {
    this.fg.markAllAsTouched();
    this.fg.updateValueAndValidity();

    if (this.fg.invalid || this.updating) {
      return;
    }
    this.updating = true;

    const req: UpdateHCProgramReq = { programID: this.data.program.programID };

    this.patchUpdateHCProgramReq(req, this.data.program, this.fv);
    if (Object.keys(req).length === 1) {
      const snack = new Snack({
        message: '沒有異動的資料',
      });
      this.snackBarService.add(snack);

      this.updating = false;
      return;
    }

    this.gsaService
      .UpdateHCProgram(req)
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

  patchUpdateHCProgramReq(
    req: UpdateHCProgramReq,
    program: HospDataHCProgram,
    fv: UpdateHCProgramFormModel
  ): UpdateHCProgramReq {
    if (program.name !== fv.name) {
      req.name = fv.name;
    }
    if (program.description !== fv.description) {
      req.description = fv.description;
    }
    if (program.charge !== fv.charge) {
      req.charge = fv.charge;
    }
    if (program.enabled !== fv.enabled) {
      req.enabled = fv.enabled;
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
  }
}
