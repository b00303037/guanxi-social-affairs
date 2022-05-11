import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { YN, YN_OBJ } from 'src/app/shared/enums/yn.enum';
import {
  HospData,
  HospDataHCProgram,
  HospDataHospital,
} from 'src/app/api/models/get-hosp-data.models';
import { HCProgramFCsModel, HCProgramFormModel } from '../apply.models';

@Component({
  selector: 'app-apply-hcprogram-step',
  templateUrl: './apply-hcprogram-step.component.html',
  styleUrls: ['./apply-hcprogram-step.component.scss'],
})
export class ApplyHCProgramStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  fcs!: HCProgramFCsModel;

  enabledHCProgramList: Array<HospDataHCProgram> = [];

  hospitalSelectList: Array<HospDataHospital> = [];
  HCProgramSelectList: Array<HospDataHCProgram> = [];

  selectedHospital: HospDataHospital | undefined;

  YNObj = YN_OBJ;

  constructor(
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {
    const { hospData } = this.route.snapshot.data as { hospData: HospData };

    this.enabledHCProgramList = hospData.HCProgramList.filter(
      (p) => p.enabled === YN.Y
    ).map((p) => ({
      ...p,
      description: p.description.replace(/\n/g, '<br/>'),
    }));
    this.hospitalSelectList = hospData.hospitalList.map((h) => {
      const hasPrograms = this.enabledHCProgramList.some(
        (p) => p.hospitalID === h.hospitalID
      );

      return {
        ...h,
        enabled: hasPrograms ? h.enabled : YN.N,
      };
    });
  }

  ngOnInit(): void {
    this.initFCs();

    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<HCProgramFormModel>((next) => {
          this.selectedHospital = this.hospitalSelectList.find(
            (h) => h.hospitalID === next.hospitalID
          );

          this.HCProgramSelectList = this.enabledHCProgramList.filter(
            (p) => p.hospitalID === next.hospitalID
          );

          const program = this.HCProgramSelectList.find(
            (p) => p.programID === next.programID
          );

          if (program === undefined) {
            this.fg.patchValue(
              {
                programID: null,
                programName: null,
                programCharge: null,
              },
              { emitEvent: false }
            );
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
