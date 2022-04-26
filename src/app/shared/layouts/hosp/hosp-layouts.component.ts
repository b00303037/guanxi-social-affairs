import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hosp-layouts',
  templateUrl: './hosp-layouts.component.html',
  styleUrls: ['./hosp-layouts.component.scss'],
})
export class HospLayoutsComponent implements OnInit, OnDestroy {
  private _mobileQueryListener = () => this.changeDetectorRef.detectChanges();

  mobileQuery: MediaQueryList = this.media.matchMedia(Breakpoints.XSmall);

  navListItems = [
    {
      icon: 'home',
      label: '首頁',
      routerLink: '/home',
    },
    {
      icon: 'view_list',
      label: '申請單列表',
      routerLink: '/hosp/hosp-appl-list',
    },
    {
      icon: 'local_hospital',
      label: '健檢項目維護',
      routerLink: '/hosp/hcprogram-mgmt',
    },
  ];

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {}

  logout(): void {
    // TODO clear token

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
