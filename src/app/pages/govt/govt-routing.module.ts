import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovtLayoutsComponent } from 'src/app/shared/layouts/govt/govt-layouts.component';
import { HospDataResolver } from 'src/app/shared/resolvers/hosp-data.resolver';
import { ApplStatisticsComponent } from './appl-statistics/appl-statistics.component';
import { GovtApplListComponent } from './govt-appl-list/govt-appl-list.component';
import { NewsMgmtComponent } from './news-mgmt/news-mgmt.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: GovtLayoutsComponent,
    resolve: {
      hospData: HospDataResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'govt-appl-list',
      },
      {
        path: 'govt-appl-list',
        component: GovtApplListComponent,
      },
      {
        path: 'appl-statistics',
        component: ApplStatisticsComponent,
      },
      {
        path: 'news-mgmt',
        component: NewsMgmtComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GovtRoutingModule {}
