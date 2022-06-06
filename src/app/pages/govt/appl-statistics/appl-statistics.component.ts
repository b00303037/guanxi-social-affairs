import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { getNumberList } from 'src/app/shared/services/utils';

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-appl-statistics',
  templateUrl: './appl-statistics.component.html',
  styleUrls: ['./appl-statistics.component.scss'],
})
export class ApplStatisticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  applList: Array<ApplInList> = [];
  view: [number, number] = [NaN, NaN];
  resultsGroupedByCreateDatetime: Array<BarChartData> = [];
  scheme = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['rgb(251, 191, 36)'],
  };
  xAxisTickFormatting = this.formatXAxisTick.bind(this);

  gettingList = false;

  constructor(
    private decimalPipe: DecimalPipe,
    private snackBarService: SnackBarService,
    private gsaService: AbstractGsaService
  ) {}

  ngOnInit(): void {
    this.onGetApplList();
  }

  formatXAxisTick(value: number): string | null {
    return this.decimalPipe.transform(value, '1.0-0');
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
          this.applList = res.content;

          this.groupApplByCreateDatetime();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  groupApplByCreateDatetime(): void {
    this.resultsGroupedByCreateDatetime = getNumberList(0, 13)
      .map((days) => format(sub(new Date(), { days }), 'MM/dd'))
      .map((tick) => ({
        name: tick,
        value: 0,
      }));

    this.applList.forEach((a) => {
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
