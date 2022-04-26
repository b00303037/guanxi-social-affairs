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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// shared
import { SharedModule } from 'src/app/shared/shared.module';

import { HospRoutingModule } from './hosp-routing.module';

// layouts
import { HospLayoutsComponent } from 'src/app/shared/layouts/hosp/hosp-layouts.component';

// pages
import { HospApplListComponent } from './hosp-appl-list/hosp-appl-list.component';
import { HcprogramMgmtComponent } from './hcprogram-mgmt/hcprogram-mgmt.component';

@NgModule({
  declarations: [
    // layouts
    HospLayoutsComponent,
    // pages
    HospApplListComponent,
    HcprogramMgmtComponent,
  ],
  imports: [
    CommonModule,
    HospRoutingModule,
    // @angular/material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    SharedModule,
  ],
})
export class HospModule {}
