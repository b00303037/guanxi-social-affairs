import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { format, sub } from 'date-fns';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  HospData,
  HospDataHospital,
} from 'src/app/api/models/get-hosp-data.models';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';
import { Genders, GENDER_MAP } from 'src/app/shared/enums/gender.enum';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { getNumberList } from 'src/app/shared/services/utils';

interface BarChartData {
  name: string;
  value: number;
  id?: unknown;
}

@Component({
  selector: 'app-appl-statistics',
  templateUrl: './appl-statistics.component.html',
  styleUrls: ['./appl-statistics.component.scss'],
})
export class ApplStatisticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  hospitalList: Array<HospDataHospital> = [];

  view: [number, number] = [NaN, NaN];
  resultsGroupedByCreateDatetime: Array<BarChartData> = [];
  resultsGroupedByGender: Array<BarChartData> = [];
  resultsGroupedByHospital: Array<BarChartData> = [];
  scheme = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['rgb(251, 191, 36)'],
  };
  barPadding: number = 16;
  xAxisDefaultTicks = [0, 1, 2];
  xAxisTickFormatting = this.formatXAxisTick.bind(this);

  gettingList = false;

  constructor(
    private route: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    private snackBarService: SnackBarService,
    private gsaService: AbstractGsaService
  ) {
    const { hospData } = this.route.parent?.snapshot.data as {
      hospData: HospData;
    };

    this.hospitalList = [...hospData.hospitalList];
  }

  ngOnInit(): void {
    this.onGetApplList();
  }

  formatXAxisTick(value: number): string | null {
    const trimmed = this.decimalPipe.transform(value, '1.0-0');

    return trimmed === `${value}` ? trimmed : '';
  }

  onGetApplList(): void {
    if (this.gettingList) {
      return;
    }
    this.gettingList = true;

    this.gsaService
      .GetApplList({})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.gettingList = false)),
        map((res) => {
          this.groupApplByCreateDatetime(res.content);
          this.groupApplByGender(res.content);
          this.groupApplByHospital(res.content);

          console.log(this.resultsGroupedByCreateDatetime);
          console.log(this.resultsGroupedByGender);
          console.log(this.resultsGroupedByHospital);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  groupApplByCreateDatetime(applList: Array<ApplInList>): void {
    this.resultsGroupedByCreateDatetime = getNumberList(0, 13)
      .map((days) => format(sub(new Date(), { days }), 'MM/dd'))
      .map((tick) => ({
        name: tick,
        value: 0,
      }));

    applList.forEach((a) => {
      if (a.status === ApplStatuses.X) {
        return;
      }

      const name = format(new Date(a.createDatetime), 'MM/dd');
      const result = this.resultsGroupedByCreateDatetime.find(
        (r) => r.name === name
      );

      if (result) {
        result.value++;
      }
    });
  }

  groupApplByGender(applList: Array<ApplInList>): void {
    this.resultsGroupedByGender = [Genders.Male, Genders.Female].map((g) => ({
      name: GENDER_MAP[g],
      value: 0,
      id: g,
    }));

    applList.forEach((a) => {
      if (a.status === ApplStatuses.X) {
        return;
      }

      const result = this.resultsGroupedByGender.find((r) => r.id === a.gender);

      if (result) {
        result.value++;
      }
    });
  }

  groupApplByHospital(applList: Array<ApplInList>): void {
    this.resultsGroupedByHospital = this.hospitalList.map((h) => ({
      name: h.name,
      value: 0,
      id: h.hospitalID,
    }));

    applList.forEach((a) => {
      if (a.status === ApplStatuses.X) {
        return;
      }

      const result = this.resultsGroupedByHospital.find(
        (r) => r.id === a.hospitalID
      );

      if (result) {
        result.value++;
      }
    });
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
