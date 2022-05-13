import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { GsaService } from 'src/app/api/gsa.service';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  APPL_STATUS_MAP,
  GOVT_APPL_STATUS_SELECT_LIST,
} from '../../enums/appl-status.enum';
import { SnackTypes } from '../../enums/snack-type.enum';
import { Snack } from '../../services/snack-bar.models';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  ApplListFilterFCsModel,
  ApplListFilterFormModel,
  ApplListPickerData,
} from './appl-list-picker.models';

@Component({
  selector: 'app-appl-list-picker',
  templateUrl: './appl-list-picker.component.html',
  styleUrls: ['./appl-list-picker.component.scss'],
})
export class ApplListPickerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<null>();
  private _gtSMQueryListener = () => this.changeDetectorRef.detectChanges();

  gtSMQuery: MediaQueryList = this.media.matchMedia('(min-width: 600px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fg = new FormGroup({
    applStatusList: new FormControl(null),
    keyword: new FormControl(null),
  });
  fcs: ApplListFilterFCsModel = {
    applStatusList: this.fg.controls['applStatusList'],
    keyword: this.fg.controls['keyword'],
  };
  get fv(): ApplListFilterFormModel {
    return this.fg.value;
  }

  applList: Array<ApplInList> = [];
  dataSource = new MatTableDataSource<ApplInList>([]);
  displayedColumns: Array<string> = ['checkbox', 'applicationID'];
  displayedColumnsSM: Array<string> = [
    'checkbox',
    'applicationID',
    'createDatetime',
    'name',
    'status',
  ];

  applStatusMap = APPL_STATUS_MAP;
  applStatusSelectList = GOVT_APPL_STATUS_SELECT_LIST;

  gettingList = false;

  pickedList: Array<ApplInList> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApplListPickerData,
    private dialogRef: MatDialogRef<ApplListPickerComponent>,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {
    this.gtSMQuery.addEventListener('change', this._gtSMQueryListener);
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('100%');

    this.fg.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap<ApplListFilterFormModel>((fv) => {
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
          this.paginator.firstPage();
        })
      )
      .subscribe();

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
    this.gettingList = true;

    this.gsaService
      .GetApplList({})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.gettingList = false)),
        map((res) => {
          this.applList = res.content;

          this.pickedList = this.applList.filter((a) =>
            this.data.defaultPickedIDList.includes(a.applicationID)
          );

          const defaultFV: ApplListFilterFormModel = {
            applStatusList: [],
            keyword: '',
          };

          this.fg.setValue(defaultFV);
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  toggle(appl: ApplInList): void {
    const index = this.pickedList.findIndex(
      (picked) => picked.applicationID === appl.applicationID
    );

    if (index === -1) {
      this.pickedList = [...this.pickedList, appl];
    } else {
      this.pickedList = this.pickedList.filter((picked, i) => i !== index);
    }
  }

  remove(appl: ApplInList): void {
    const index = this.pickedList.findIndex(
      (picked) => picked.applicationID === appl.applicationID
    );

    if (index !== -1) {
      this.pickedList = this.pickedList.filter((picked, i) => i !== index);
    }
  }

  onPickApplList(): void {
    this.dialogRef.close(this.pickedList);
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {}
}
