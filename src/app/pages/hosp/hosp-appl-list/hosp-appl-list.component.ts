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
  Subject,
  takeUntil,
  finalize,
  map,
  catchError,
  filter,
  tap,
  Observable,
  EMPTY,
  debounceTime,
} from 'rxjs';
import {
  APPL_STATUS_OBJ,
  APPL_STATUS_MAP,
  HOSP_APPL_STATUS_SELECT_LIST,
} from 'src/app/shared/enums/appl-status.enum';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  ExtendedAppl,
  getExtendedApplInList,
} from 'src/app/api/models/get-appl.models';
import { HospData } from 'src/app/api/models/get-hosp-data.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import {
  ArrangeApplDialogData,
  ArrangeApplDialogResult,
} from 'src/app/shared/components/arrange-appl-dialog/arrange-appl-dialog.models';
import { ArrangeApplDialogComponent } from 'src/app/shared/components/arrange-appl-dialog/arrange-appl-dialog.component';
import {
  CompleteApplDialogData,
  CompleteApplDialogResult,
} from 'src/app/shared/components/complete-appl-dialog/complete-appl-dialog.models';
import { CompleteApplDialogComponent } from 'src/app/shared/components/complete-appl-dialog/complete-appl-dialog.component';
import { YN } from 'src/app/shared/enums/yn.enum';
import { FormControl, FormGroup } from '@angular/forms';
import {
  HospApplListFilterFCsModel,
  HospApplListFilterFormModel,
} from './hosp-appl-list.models';
import { MatSort, Sort } from '@angular/material/sort';
import { getNumberList } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-hosp-appl-list',
  templateUrl: './hosp-appl-list.component.html',
  styleUrls: ['./hosp-appl-list.component.scss'],
})
export class HospApplListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<null>();
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fg = new FormGroup({
    applStatusList: new FormControl(null),
    yyyyList: new FormControl([`${new Date().getFullYear()}`]),
    keyword: new FormControl(null),
  });
  fcs: HospApplListFilterFCsModel = {
    applStatusList: this.fg.controls['applStatusList'],
    yyyyList: this.fg.controls['yyyyList'],
    keyword: this.fg.controls['keyword'],
  };
  get fv(): HospApplListFilterFormModel {
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

  applStatusSelectList = HOSP_APPL_STATUS_SELECT_LIST;
  applStatusObj = APPL_STATUS_OBJ;
  applStatusMap = APPL_STATUS_MAP;
  yyyySelectList: Array<string> = getNumberList(
    2022,
    new Date().getFullYear()
  ).map((year) => `${year}`);

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
        tap<HospApplListFilterFormModel>((fv) => {
          let result = [...this.applList];
          const { applStatusList, keyword, yyyyList } = fv;

          if ((applStatusList?.length ?? 0) !== 0) {
            result = result.filter((a) => applStatusList.includes(a.status));
          }
          if ((yyyyList?.length ?? 0) !== 0) {
            result = result.filter((a) =>
              yyyyList.includes(a.applicationID.substring(0, 4))
            );
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
    this.dataSource.sort = this.sort;

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

  onGetAppl(applInList: ApplInList): void {
    if (
      this.getting ||
      this.expandedAppl?.applicationID === applInList.applicationID
    ) {
      return;
    }

    const { hospData } = this.route.parent?.snapshot.data as {
      hospData: HospData;
    };
    this.expandedAppl = getExtendedApplInList(applInList, hospData);
  }

  onSortChange(sort: Sort): void {
    this.expandingApplID = undefined;
    this.expandedAppl = null;
  }

  openArrangeApplDialog(applicationID: string, scheduledDate: string): void {
    const data: ArrangeApplDialogData = {
      applicationID,
      scheduledDate,
    };

    this.matDialog
      .open(ArrangeApplDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<ArrangeApplDialogResult>((result) => result === true),
        tap(() => this.onGetApplList())
      )
      .subscribe();
  }

  openCompleteApplDialog(
    applicationID: string,
    completionDate: string,
    hasCancer: YN
  ): void {
    const data: CompleteApplDialogData = {
      applicationID,
      completionDate,
      hasCancer,
    };

    this.matDialog
      .open(CompleteApplDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<CompleteApplDialogResult>((result) => result === true),
        tap(() => this.onGetApplList())
      )
      .subscribe();
  }

  // openCancelApplDialog(applicationID: string): void {
  //   const data: CancelApplDialogData = {
  //     applicationID,
  //   };

  //   this.matDialog
  //     .open(CancelApplDialogComponent, { data })
  //     .afterClosed()
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       filter<CancelApplDialogResult>((result) => result === true),
  //       tap(() => this.onGetApplList())
  //     )
  //     .subscribe();
  // }

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
