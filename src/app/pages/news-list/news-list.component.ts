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
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { YN } from 'src/app/shared/enums/yn.enum';
import { NewsInList } from 'src/app/api/models/get-news-list.models';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  NewsListFilterFCsModel,
  NewsListFilterFormModel,
} from './news-list.models';
import { add, isAfter, isBefore, parse, sub } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    const { newsList } = this.route.snapshot.data as {
      newsList: Array<NewsInList>;
    };

    this.newsList = newsList;
  }

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
        })
      )
      .subscribe();

    this.fg.setValue(this.fv);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
