import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  finalize,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import { ApplListPickerComponent } from 'src/app/shared/components/appl-list-picker/appl-list-picker.component';
import {
  ApplListPickerData,
  ApplListPickerResult,
} from 'src/app/shared/components/appl-list-picker/appl-list-picker.models';
import {
  APPL_STATUS_MAP,
  APPL_STATUS_SELECT_LIST,
} from 'src/app/shared/enums/appl-status.enum';
import {
  ReceiverTypes,
  RECEIVER_TYPE_OBJ,
} from 'src/app/shared/enums/receiver-types.enum';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ReceiverFCsModel, ReceiverFormModel } from '../notification.models';

@Component({
  selector: 'app-notify-receiver-step',
  templateUrl: './notify-receiver-step.component.html',
  styleUrls: ['./notify-receiver-step.component.scss'],
})
export class NotifyReceiverStepComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<null>();
  private _gtSMQueryListener = () => this.changeDetectorRef.detectChanges();

  gtSMQuery: MediaQueryList = this.media.matchMedia('(min-width: 600px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() fg!: FormGroup;
  fcs!: ReceiverFCsModel;

  applList: Array<ApplInList> = [];
  dataSource = new MatTableDataSource<ApplInList>([]);
  displayedColumns: Array<string> = ['applicationID'];
  displayedColumnsSM: Array<string> = [
    'applicationID',
    'createDatetime',
    'name',
    'status',
  ];

  receiverTypeObj = RECEIVER_TYPE_OBJ;
  applStatusSelectList = APPL_STATUS_SELECT_LIST;
  applStatusMap = APPL_STATUS_MAP;

  gettingList = false;

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
    this.initFCs();

    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<ReceiverFormModel>((fv) => {
          switch (fv.receiverType) {
            case ReceiverTypes.ByApplStatus:
              this.dataSource.data = this.applList.filter((a) =>
                fv.applStatusList?.includes(a.status)
              );
              break;
            case ReceiverTypes.ByApplID:
              this.dataSource.data = this.applList.filter((a) =>
                fv.applIDList?.includes(a.applicationID)
              );
              break;
            default:
              this.dataSource.data = [];
              break;
          }
        })
      )
      .subscribe();

    const receiverType: ReceiverTypes = this.fcs['receiverType'].value;

    this.fcs['receiverType'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(receiverType),
        tap<ReceiverTypes>((next) => {
          switch (next) {
            case ReceiverTypes.ByApplStatus:
              this.fcs['applStatusList'].enable();
              this.fcs['applIDList'].disable();
              break;
            case ReceiverTypes.ByApplID:
              this.fcs['applStatusList'].disable();
              this.fcs['applIDList'].enable();
              break;
          }
        })
      )
      .subscribe();

    this.onGetApplList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initFCs(): void {
    this.fcs = {
      receiverType: this.fg.controls['receiverType'],
      applStatusList: this.fg.controls['applStatusList'],
      applIDList: this.fg.controls['applIDList'],
    };
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
          this.applList = res.content;
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  openApplListPicker(e: Event): void {
    e.stopPropagation();

    if (this.fcs['applIDList'].disabled) {
      return;
    }

    const data: ApplListPickerData = {
      defaultPickedIDList: this.fcs['applIDList'].value ?? [],
    };

    this.matDialog
      .open(ApplListPickerComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<ApplListPickerResult>((result) => result !== undefined),
        tap((result) => {
          this.fcs['applIDList'].setValue(
            result?.map((a) => a.applicationID) ?? []
          );
        })
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

    this.gtSMQuery.removeEventListener('change', this._gtSMQueryListener);
  }
}
