import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  filter,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  ApplStatuses,
  APPL_STATUS_MAP,
  APPL_STATUS_OBJ,
} from 'src/app/shared/enums/appl-status.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { CancelApplReq } from 'src/app/api/models/cancel-appl.models';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  getExtendedAppl,
  ExtendedAppl,
  GetApplReq,
} from 'src/app/api/models/get-appl.models';
import { HospData } from 'src/app/api/models/get-hosp-data.models';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-govt-appl-list',
  templateUrl: './govt-appl-list.component.html',
  styleUrls: ['./govt-appl-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class GovtApplListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<null>();
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
    private gsaService: GsaService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);
  }

  ngOnInit(): void {
    this.onGetApplList();
  }

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
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          const { hospData } = this.route.parent?.snapshot.data as {
            hospData: HospData;
          };

          this.expandingApplID = undefined;
          this.expandedAppl = getExtendedAppl(res.content, hospData);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onConfirmCancelAppl(applicationID: string): void {
    const data = new ConfirmDialogData({
      title: '是否取消申請？',
    });

    this.matDialog
      .open(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<ConfirmDialogResult>((result) => result === true),
        tap(() => this.onCancelAppl(applicationID))
      )
      .subscribe();
  }

  onCancelAppl(applicationID: string): void {
    if (this.cancelling) {
      return;
    }
    this.cancelling = true;

    const req: CancelApplReq = {
      applicationID,
    };

    this.gsaService
      .CancelAppl(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.cancelling = false)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.onGetApplList();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onConfirmReviewAppl(applicationID: string, status: ApplStatuses): void {
    // TODO open ReviewApplDialog
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
