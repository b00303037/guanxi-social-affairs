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
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { HospDataHCProgram } from 'src/app/api/models/get-hosp-data.models';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UpdateHCProgramReq } from 'src/app/api/models/update-hcprogram.models';

@Component({
  selector: 'app-hcprogram-mgmt',
  templateUrl: './hcprogram-mgmt.component.html',
  styleUrls: ['./hcprogram-mgmt.component.scss'],
})
export class HcprogramMgmtComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<null>();
  private _gtSMQueryListener = () => this.changeDetectorRef.detectChanges();

  gtSMQuery: MediaQueryList = this.media.matchMedia('(min-width: 600px)');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<HospDataHCProgram>([]);
  displayedColumns: Array<string> = ['name', 'charge', 'actions'];
  displayedColumnsSM: Array<string> = [
    'enabled',
    'name',
    'description',
    'charge',
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
    this.onGetHospData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetHospData(): void {
    if (this.getting) {
      return;
    }
    this.getting = true;

    this.gsaService
      .GetHospData()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          const hospitalID = 0; // TODO get it from token

          this.dataSource.data = res.content.HCProgramList.filter(
            (p) => p.hospitalID === hospitalID
          );
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  onHCProgramEnabledChange(e: MatSlideToggleChange, programID: number): void {
    if (this.updatingIDs.has(programID)) {
      return;
    }
    this.updatingIDs.add(programID);

    const req: UpdateHCProgramReq = {
      programID,
      enabled: e.checked ? YN.Y : YN.N,
    };

    this.gsaService
      .UpdateHCProgram(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.updatingIDs.delete(programID)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.dataSource.data = this.dataSource.data.map((p) =>
            p.programID === programID
              ? ({
                  ...p,
                  enabled: req.enabled,
                } as HospDataHCProgram)
              : p
          );
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  openUpdateHCProgramDialog(programID: number): void {
    // TODO open UpdateHCProgramDialog
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
