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
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { YN_MAP } from 'src/app/api/enums/yn.enum';
import { GsaService } from 'src/app/api/gsa.service';
import { HCProgram } from 'src/app/api/models/get-hcprogram-list.models';

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

  dataSource = new MatTableDataSource<HCProgram>([]);
  displayedColumns: Array<string> = ['name', 'charge', 'actions'];
  displayedColumnsSM: Array<string> = [
    'enabled',
    'name',
    'description',
    'charge',
    'actions',
  ];

  ynMap = YN_MAP;

  getting = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private gsaService: GsaService
  ) {
    this.gtSMQuery.addEventListener('change', this._gtSMQueryListener);
  }

  ngOnInit(): void {
    this.onGetHCProgramList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetHCProgramList(): void {
    if (this.getting) {
      return;
    }
    this.getting = true;

    this.gsaService
      .GetHCProgramList({})
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

  openUpdateHCProgramDialog(programID: number): void {
    // TODO
  }

  onError(err: string): Observable<never> {
    this.snackBar.open(err, '', { panelClass: 'error' });

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.gtSMQuery.removeEventListener('change', this._gtSMQueryListener);
  }
}
