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
import { GsaService } from 'src/app/api/gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
  resultsGroupedByCreateDatetime: Array<BarChartData> = [];
  scheme = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['rgb(251, 191, 36)'],
  };
  yAxisTickFormatting = this.formatYAxisTick.bind(this);

  gettingList = false;

  constructor(
    private decimalPipe: DecimalPipe,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {
    this.onGetApplList();
  }

  formatYAxisTick(value: number): string | null {
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
          this.applList = res.content.sort(
            (a, b) =>
              new Date(a.createDatetime).valueOf() -
              new Date(b.createDatetime).valueOf()
          );

          this.groupApplByCreateDatetime();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  groupApplByCreateDatetime(): void {
    this.resultsGroupedByCreateDatetime = [
      11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
    ]
      .map((months) => format(sub(new Date(), { months }), 'yyyy/MM'))
      .map((tick) => ({
        name: tick,
        value: 0,
      }));

    this.applList.forEach((a) => {
      if (a.status === ApplStatuses.X) {
        return;
      }

      const name = format(new Date(a.createDatetime), 'yyyy/MM');
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
