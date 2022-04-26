import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-govt-layouts',
  templateUrl: './govt-layouts.component.html',
  styleUrls: ['./govt-layouts.component.scss'],
})
export class GovtLayoutsComponent implements OnInit {
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
      routerLink: '/govt/govt-appl-list',
    },
    {
      icon: 'analytics',
      label: '申請件數統計',
      routerLink: '/govt/appl-statistics',
    },
    {
      icon: 'feed',
      label: '最新消息維護',
      routerLink: '/govt/news-mgmt',
    },
    {
      icon: 'notifications_active',
      label: '發送通知',
      routerLink: '/govt/notification',
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
