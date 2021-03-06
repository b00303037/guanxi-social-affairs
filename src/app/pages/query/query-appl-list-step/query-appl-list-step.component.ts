import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  filter,
  finalize,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  APPL_STATUS_MAP,
  APPL_STATUS_OBJ,
} from 'src/app/shared/enums/appl-status.enum';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  getExtendedAppl,
  ExtendedAppl,
  GetApplReq,
} from 'src/app/api/models/get-appl.models';
import { HospData } from 'src/app/api/models/get-hosp-data.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import {
  UpdateApplDialogData,
  UpdateApplDialogResult,
} from 'src/app/shared/components/update-appl-dialog/update-appl-dialog.models';
import { Settings } from 'src/app/api/models/get-settings.models';
import { UpdateApplDialogComponent } from 'src/app/shared/components/update-appl-dialog/update-appl-dialog.component';
import { CancelApplDialogComponent } from 'src/app/shared/components/cancel-appl-dialog/cancel-appl-dialog.component';
import {
  CancelApplDialogData,
  CancelApplDialogResult,
} from 'src/app/shared/components/cancel-appl-dialog/cancel-appl-dialog.models';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-query-appl-list-step',
  templateUrl: './query-appl-list-step.component.html',
  styleUrls: ['./query-appl-list-step.component.scss'],
})
export class QueryApplListStepComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<null>();
  private sortChange$ = new Subject<null>();
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<ApplInList>([]);
  displayedColumns: Array<string> = ['applicationID', 'actions'];
  displayedColumnsMD: Array<string> = [
    'applicationID',
    'createDatetime',
    'name',
    'status',
    'actions',
  ];
  expandingApplID: string | undefined;
  expandedAppl: ExtendedAppl | null = null;

  applStatusObj = APPL_STATUS_OBJ;
  applStatusMap = APPL_STATUS_MAP;

  gettingList = false;
  getting = false;
  cancelling = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private snackBarService: SnackBarService,
    private gsaService: AbstractGsaService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetApplList(): void {
    if (this.gettingList) {
      return;
    }
    this.expandedAppl = null;
    this.gettingList = true;

    this.gsaService
      .GetApplList({})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.gettingList = false)),
        map((res) => {
          this.dataSource.data = res.content;
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onGetAppl(applicationID: string): void {
    if (this.getting || this.expandedAppl?.applicationID === applicationID) {
      return;
    }
    this.expandingApplID = applicationID;
    this.expandedAppl = null;
    this.getting = true;

    const req: GetApplReq = {
      applicationID,
    };
    this.gsaService
      .GetAppl(req)
      .pipe(
        takeUntil(merge(this.destroy$, this.sortChange$)),
        finalize(() => (this.getting = false)),
        map((res) => {
          const { hospData } = this.route.snapshot.data as {
            hospData: HospData;
          };

          this.expandingApplID = undefined;
          this.expandedAppl = getExtendedAppl(res.content, hospData);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onSortChange(sort: Sort): void {
    this.expandingApplID = undefined;
    this.expandedAppl = null;

    this.sortChange$.next(null);
  }

  openUpdateApplDialog(applicationID: string): void {
    const { hospData, settings } = this.route.snapshot.data as {
      hospData: HospData;
      settings: Settings;
    };

    const data: UpdateApplDialogData = {
      applicationID,
      hospData,
      settings,
    };

    this.matDialog
      .open(UpdateApplDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<UpdateApplDialogResult>((result) => result === true),
        tap(() => this.onGetApplList())
      )
      .subscribe();
  }

  openCancelApplDialog(applicationID: string): void {
    const data: CancelApplDialogData = {
      applicationID,
    };

    this.matDialog
      .open(CancelApplDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<CancelApplDialogResult>((result) => result === true),
        tap(() => this.onGetApplList())
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
    this.sortChange$.complete();

    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
