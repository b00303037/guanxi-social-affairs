import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Subject,
  takeUntil,
  finalize,
  map,
  catchError,
  Observable,
  EMPTY,
  filter,
  tap,
  debounceTime,
} from 'rxjs';
import { YN, YN_OBJ } from 'src/app/shared/enums/yn.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { NewsInList } from 'src/app/api/models/get-news-list.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UpdateNewsReq } from 'src/app/api/models/update-news.models';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNewsDialogComponent } from 'src/app/shared/components/update-news-dialog/update-news-dialog.component';
import {
  UpdateNewsDialogData,
  UpdateNewsDialogResult,
} from 'src/app/shared/components/update-news-dialog/update-news-dialog.models';
import { AddNewsDialogComponent } from 'src/app/shared/components/add-news-dialog/add-news-dialog.component';
import { AddNewsDialogResult } from 'src/app/shared/components/add-news-dialog/add-news-dialog.models';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  NewsMgmtFilterFCsModel,
  NewsMgmtFilterFormModel,
} from './news-mgmt.models';
import { add, isAfter, isBefore, parse, sub } from 'date-fns';

@Component({
  selector: 'app-news-mgmt',
  templateUrl: './news-mgmt.component.html',
  styleUrls: ['./news-mgmt.component.scss'],
})
export class NewsMgmtComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<null>();
  private _gtSMQueryListener = () => this.changeDetectorRef.detectChanges();

  gtSMQuery: MediaQueryList = this.media.matchMedia('(min-width: 600px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fg = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    keyword: new FormControl(null),
  });
  fcs: NewsMgmtFilterFCsModel = {
    startDate: this.fg.controls['startDate'],
    endDate: this.fg.controls['endDate'],
    keyword: this.fg.controls['keyword'],
  };
  get fv(): NewsMgmtFilterFormModel {
    return this.fg.value;
  }

  newsList: Array<NewsInList> = [];
  dataSource = new MatTableDataSource<NewsInList>([]);
  displayedColumns: Array<string> = ['title', 'date', 'actions'];
  displayedColumnsSM: Array<string> = [
    'enabled',
    'pinned',
    'title',
    'date',
    'actions',
  ];

  YNObj = YN_OBJ;

  getting = false;
  updatingIDs = new Set<number>();

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private matDialog: MatDialog,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    this.gtSMQuery.addEventListener('change', this._gtSMQueryListener);
  }

  ngOnInit(): void {
    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<NewsMgmtFilterFormModel>((fv) => {
          let result = [...this.newsList];
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

          const defaultFV: NewsMgmtFilterFormModel = {
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

  openAddNewsDialog(): void {
    this.matDialog
      .open(AddNewsDialogComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<AddNewsDialogResult>((result) => result === true),
        tap(() => this.onGetNewsList())
      )
      .subscribe();
  }

  onNewsEnabledChange(e: MatSlideToggleChange, newsID: number): void {
    if (this.updatingIDs.has(newsID)) {
      return;
    }
    this.updatingIDs.add(newsID);

    const req: UpdateNewsReq = {
      newsID,
      enabled: e.checked ? YN.Y : YN.N,
    };

    this.gsaService
      .UpdateNews(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.updatingIDs.delete(newsID)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.dataSource.data = this.dataSource.data.map((n) =>
            n.newsID === newsID
              ? ({
                  ...n,
                  enabled: req.enabled,
                } as NewsInList)
              : n
          );
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onNewsPinnedChange(e: MatSlideToggleChange, newsID: number): void {
    if (this.updatingIDs.has(newsID)) {
      return;
    }
    this.updatingIDs.add(newsID);

    const req: UpdateNewsReq = {
      newsID,
      pinned: e.checked ? YN.Y : YN.N,
    };

    this.gsaService
      .UpdateNews(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.updatingIDs.delete(newsID)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.dataSource.data = this.dataSource.data.map((n) =>
            n.newsID === newsID
              ? ({
                  ...n,
                  pinned: req.pinned,
                } as NewsInList)
              : n
          );
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  openUpdateNewsDialog(newsID: number): void {
    const data: UpdateNewsDialogData = {
      newsID,
    };

    this.matDialog
      .open(UpdateNewsDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<UpdateNewsDialogResult>((result) => result === true),
        tap(() => this.onGetNewsList())
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

    this.gtSMQuery.removeEventListener('change', this._gtSMQueryListener);
  }
}
