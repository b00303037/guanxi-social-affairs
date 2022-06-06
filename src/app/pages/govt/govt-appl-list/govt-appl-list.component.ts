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
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  debounceTime,
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
  GOVT_APPL_STATUS_SELECT_LIST,
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
  CancelApplDialogData,
  CancelApplDialogResult,
} from 'src/app/shared/components/cancel-appl-dialog/cancel-appl-dialog.models';
import { CancelApplDialogComponent } from 'src/app/shared/components/cancel-appl-dialog/cancel-appl-dialog.component';
import {
  ReviewApplDialogData,
  ReviewApplDialogResult,
} from 'src/app/shared/components/review-appl-dialog/review-appl-dialog.models';
import { ReviewApplDialogComponent } from 'src/app/shared/components/review-appl-dialog/review-appl-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import {
  GovtApplListFilterFCsModel,
  GovtApplListFilterFormModel,
} from './govt-appl-list.models';

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

  fg = new FormGroup({
    applStatusList: new FormControl(null),
    keyword: new FormControl(null),
  });
  fcs: GovtApplListFilterFCsModel = {
    applStatusList: this.fg.controls['applStatusList'],
    keyword: this.fg.controls['keyword'],
  };
  get fv(): GovtApplListFilterFormModel {
    return this.fg.value;
  }

  applList: Array<ApplInList> = [];
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

  applStatusSelectList = GOVT_APPL_STATUS_SELECT_LIST;
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

  ngOnInit(): void {
    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<GovtApplListFilterFormModel>((fv) => {
          let result = [...this.applList];
          const { applStatusList, keyword } = fv;

          if ((applStatusList?.length ?? 0) !== 0) {
            result = result.filter((a) => applStatusList.includes(a.status));
          }
          if (typeof keyword === 'string' && keyword.length > 0) {
            result = result.filter((a) =>
              [a.applicationID, a.name].some((value) => value.includes(keyword))
            );
          }

          this.dataSource.data = result;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.onGetApplList();
    });
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
          this.applList = res.content;

          this.fg.setValue(this.fv);
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

  openReviewApplDialog(applicationID: string, status: ApplStatuses): void {
    const data: ReviewApplDialogData = {
      applicationID,
      status,
    };

    this.matDialog
      .open(ReviewApplDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<ReviewApplDialogResult>((result) => result === true),
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

    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
