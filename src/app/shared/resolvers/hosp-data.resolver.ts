import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { HospData } from 'src/app/api/models/get-hosp-data.models';

@Injectable({
  providedIn: 'root',
})
export class HospDataResolver implements Resolve<HospData> {
  constructor(private gsaService: GsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): HospData | Observable<HospData> {
    return this.gsaService.GetHospData().pipe(
      map((res) => {
        return res.content;
      }),
      catchError((err) => {
        return of({
          hospitalList: [],
          HCProgramList: [],
        });
      })
    );
  }
}
