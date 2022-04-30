import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @angular/material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// shared
import { SharedModule } from 'src/app/shared/shared.module';

import { GovtRoutingModule } from './govt-routing.module';

// layouts
import { GovtLayoutsComponent } from 'src/app/shared/layouts/govt/govt-layouts.component';

// pages
import { GovtApplListComponent } from './govt-appl-list/govt-appl-list.component';
import { ApplStatisticsComponent } from './appl-statistics/appl-statistics.component';
import { NewsMgmtComponent } from './news-mgmt/news-mgmt.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    // layouts
    GovtLayoutsComponent,
    // pages
    GovtApplListComponent,
    ApplStatisticsComponent,
    NewsMgmtComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    GovtRoutingModule,
    // @angular/material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    // shared
    SharedModule,
  ],
})
export class GovtModule {}
