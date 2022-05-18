import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  catchError,
  debounceTime,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { YN } from 'src/app/shared/enums/yn.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { NewsInList } from 'src/app/api/models/get-news-list.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  NewsListFilterFCsModel,
  NewsListFilterFormModel,
} from './news-list.models';
import { add, isAfter, isBefore, parse, sub } from 'date-fns';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fg = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    keyword: new FormControl(null),
  });
  fcs: NewsListFilterFCsModel = {
    startDate: this.fg.controls['startDate'],
    endDate: this.fg.controls['endDate'],
    keyword: this.fg.controls['keyword'],
  };
  get fv(): NewsListFilterFormModel {
    return this.fg.value;
  }

  newsList: Array<NewsInList> = [];
  dataSource = new MatTableDataSource<NewsInList>([]);
  displayedColumns: Array<string> = ['title', 'date'];

  getting = false;

  constructor(
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {
    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<NewsListFilterFormModel>((fv) => {
          let result = this.newsList.filter((n) => n.enabled === YN.Y);
          const { startDate, endDate, keyword } = fv;

          if (startDate !== null || endDate !== null) {
            result = result.filter((a) => {
              const date = parse(a.date, 'yyyy/MM/dd', new Date());

              return (
                (startDate === null ||
                  isAfter(date, sub(startDate, { days: 1 }))) &&
                (endDate === null || isBefore(date, add(endDate, { days: 1 })))
              );
            });
          }
          if (typeof keyword === 'string' && keyword.length > 0) {
            result = result.filter((a) =>
              [a.title].some((value) => value.includes(keyword))
            );
          }

          this.dataSource.data = result;
          this.paginator.firstPage();
        })
      )
      .subscribe();

    this.onGetNewsList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetNewsList(): void {
    if (this.getting) {
      return;
    }
    this.getting = true;

    this.gsaService
      .GetNewsList({})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          this.newsList = res.content;

          const defaultFV: NewsListFilterFormModel = {
            startDate: null,
            endDate: null,
            keyword: '',
          };

          this.fg.setValue(defaultFV);
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

  clearDate(e: Event, control: AbstractControl): void {
    e.stopPropagation();

    control.setValue(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
