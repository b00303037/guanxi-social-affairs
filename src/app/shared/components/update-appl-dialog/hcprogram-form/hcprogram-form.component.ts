import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  HospData,
  HospDataHCProgram,
  HospDataHospital,
} from 'src/app/api/models/get-hosp-data.models';
import { YN, YN_OBJ } from 'src/app/shared/enums/yn.enum';
import {
  HCProgramFCsModel,
  HCProgramFormModel,
} from '../update-appl-dialog.models';

@Component({
  selector: 'app-hcprogram-form',
  templateUrl: './hcprogram-form.component.html',
  styleUrls: ['./hcprogram-form.component.scss'],
})
export class HCProgramFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  @Input() hospData!: HospData;
  fcs!: HCProgramFCsModel;

  enabledHCProgramList: Array<HospDataHCProgram> = [];

  hospitalSelectList: Array<HospDataHospital> = [];
  HCProgramSelectList: Array<HospDataHCProgram> = [];

  YNObj = YN_OBJ;

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.enabledHCProgramList = this.hospData.HCProgramList.filter(
      (h) => h.enabled === YN.Y
    );
    this.hospitalSelectList = this.hospData.hospitalList.map((h) => {
      const hasPrograms = this.enabledHCProgramList.some(
        (p) => p.hospitalID === h.hospitalID
      );

      return {
        ...h,
        enabled: hasPrograms ? h.enabled : YN.N,
      };
    });

    this.initFCs();

    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        tap<HCProgramFormModel>((next) => {
          this.HCProgramSelectList = this.enabledHCProgramList.filter(
            (p) => p.hospitalID === next.hospitalID
          );

          const program = this.HCProgramSelectList.find(
            (p) => p.programID === next.programID
          );

          if (program === undefined) {
            this.fcs['programID'].setValue(null);
            this.fcs['programName'].setValue(null);
            this.fcs['programCharge'].setValue(null);
          }
        })
      )
      .subscribe();
  }

  initFCs(): void {
    this.fcs = {
      hospitalID: this.fg.controls['hospitalID'],
      programID: this.fg.controls['programID'],
      programName: this.fg.controls['programName'],
      programCharge: this.fg.controls['programCharge'],
    };
  }

  onSelectProgram(program: HospDataHCProgram): void {
    const { programID, name, charge } = program;

    this.fcs['programID'].setValue(programID);
    this.fcs['programName'].setValue(name);
    this.fcs['programCharge'].setValue(
      this.currencyPipe.transform(charge, 'TWD', 'code', '1.0-2')
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
