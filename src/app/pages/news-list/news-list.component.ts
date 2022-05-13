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
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { YN } from 'src/app/shared/enums/yn.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { NewsInList } from 'src/app/api/models/get-news-list.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<NewsInList>([]);
  displayedColumns: Array<string> = ['title', 'date'];

  getting = false;

  constructor(
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

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
          this.dataSource.data = res.content.filter(
            (news) => news.enabled === YN.Y
          );
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

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
