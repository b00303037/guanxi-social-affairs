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
} from 'rxjs';
import { YN, YN_OBJ } from 'src/app/shared/enums/yn.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { NewsInList } from 'src/app/api/models/get-news-list.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UpdateNewsReq } from 'src/app/api/models/update-news.models';

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

  dataSource = new MatTableDataSource<NewsInList>([]);
  displayedColumns: Array<string> = ['title', 'date', 'actions'];
  displayedColumnsSM: Array<string> = [
    'enabled',
    'pinned',
    'title',
    'date',
    'actions',
  ];

  ynObj = YN_OBJ;

  getting = false;
  updatingIDs = new Set<number>();

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    this.gtSMQuery.addEventListener('change', this._gtSMQueryListener);
  }

  ngOnInit(): void {
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
          this.dataSource.data = res.content;
        }),
        catchError((err) => this.onError(err))
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
                  pinned: req.enabled,
                } as NewsInList)
              : n
          );
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  openUpdateNewsDialog(newsID: number): void {
    // TODO open UpdateNewsDialog
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.gtSMQuery.removeEventListener('change', this._gtSMQueryListener);
  }
}
