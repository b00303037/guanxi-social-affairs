import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { YN, YN_OBJ } from 'src/app/api/enums/yn.enum';
import {
  HospData,
  HospDataHCProgram,
  HospDataHospital,
} from 'src/app/api/models/get-hosp-data.models';

@Component({
  selector: 'app-apply-hcprogram-step',
  templateUrl: './apply-hcprogram-step.component.html',
  styleUrls: ['./apply-hcprogram-step.component.scss'],
})
export class ApplyHCProgramStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  @Input() fcs!: { [key: string]: AbstractControl };

  enabledHCProgramList: Array<HospDataHCProgram> = [];

  hospitalSelectList: Array<HospDataHospital> = [];
  HCProgramSelectList: Array<HospDataHCProgram> = [];

  YNObj = YN_OBJ;

  constructor(
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {
    const { hospData } = this.route.snapshot.data as { hospData: HospData };

    this.enabledHCProgramList = hospData.HCProgramList.filter(
      (h) => h.enabled === YN.Y
    );
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
    this.fcs['hospitalID'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        tap<number>((next) => {
          this.HCProgramSelectList = this.enabledHCProgramList.filter(
            (p) => p.hospitalID === next
          );

          this.fcs['programID'].setValue(null);
          this.fcs['programName'].setValue(null);
          this.fcs['programCharge'].setValue(null);
        })
      )
      .subscribe();
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
