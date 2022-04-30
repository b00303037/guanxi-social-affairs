import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  blocking$: Observable<boolean> = this.router.events.pipe(
    filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd),
    map((e) => e instanceof NavigationStart)
  );

  constructor(private router: Router) {}
}
