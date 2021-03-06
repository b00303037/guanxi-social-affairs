import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// @swimlane/ngx-charts
import { NgxChartsModule } from '@swimlane/ngx-charts';

// @angular/material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
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
import { NotifyReceiverStepComponent } from './notification/notify-receiver-step/notify-receiver-step.component';
import { NotifyContentStepComponent } from './notification/notify-content-step/notify-content-step.component';
import { GovtChangePasswordComponent } from './govt-change-password/govt-change-password.component';

@NgModule({
  declarations: [
    // layouts
    GovtLayoutsComponent,
    // pages
    GovtApplListComponent,
    ApplStatisticsComponent,
    NewsMgmtComponent,
    NotificationComponent,
    NotifyReceiverStepComponent,
    NotifyContentStepComponent,
    GovtChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GovtRoutingModule,
    // @swimlane/ngx-charts
    NgxChartsModule,
    // @angular/material
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    // shared
    SharedModule,
  ],
  providers: [DecimalPipe],
})
export class GovtModule {}
