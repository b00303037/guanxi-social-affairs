import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { Settings } from 'src/app/api/models/get-settings.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsResolver implements Resolve<Settings | null> {
  private _settingsCache: Settings | undefined;

  constructor(private gsaService: AbstractGsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Settings | null | Observable<Settings | null> {
    return (
      this._settingsCache ??
      this.gsaService.GetSettings().pipe(
        map((res) => {
          this._settingsCache = res.content;

          return res.content;
        }),
        catchError((err) => {
          return of(null);
        })
      )
    );
  }
}
