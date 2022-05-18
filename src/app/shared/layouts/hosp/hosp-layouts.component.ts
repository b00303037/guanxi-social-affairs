import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    {
      icon: 'lock_reset',
      label: '變更密碼',
      routerLink: '/hosp/change-password',
    },
  ];

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.removeToken();

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
