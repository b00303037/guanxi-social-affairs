import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { HospData } from 'src/app/api/models/get-hosp-data.models';

@Injectable({
  providedIn: 'root',
})
export class HospDataResolver implements Resolve<HospData> {
  private _hospDataCache: HospData | undefined;
  private hospSeqOrderList: Array<number> = [2, 3, 1, 5, 4, 6];

  constructor(private gsaService: AbstractGsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): HospData | Observable<HospData> {
    return (
      this._hospDataCache ??
      this.gsaService.GetHospData().pipe(
        map((res) => {
          res.content.hospitalList.sort(
            (a, b) =>
              this.hospSeqOrderList.findIndex((i) => i === a.hospitalID) -
              this.hospSeqOrderList.findIndex((i) => i === b.hospitalID)
          );

          this._hospDataCache = res.content;

          return res.content;
        }),
        catchError((err) => {
          return of({
            hospitalList: [],
            HCProgramList: [],
          });
        })
      )
    );
  }
}
