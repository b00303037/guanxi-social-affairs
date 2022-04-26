import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  blocking$ = new BehaviorSubject<boolean>(false);
  spinnerTop = 0;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (e) => e instanceof NavigationStart || e instanceof NavigationEnd
        ),
        tap((e) => {
          if (e instanceof NavigationEnd) {
            window.scrollTo(0, 0);
          }

          this.blocking$.next(e instanceof NavigationStart);
        })
      )
      .subscribe();
  }
}
