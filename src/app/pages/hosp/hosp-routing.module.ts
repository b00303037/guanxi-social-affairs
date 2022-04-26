import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospLayoutsComponent } from 'src/app/shared/layouts/hosp/hosp-layouts.component';
import { HospDataResolver } from 'src/app/shared/resolvers/hosp-data.resolver';
import { HcprogramMgmtComponent } from './hcprogram-mgmt/hcprogram-mgmt.component';
import { HospApplListComponent } from './hosp-appl-list/hosp-appl-list.component';

const routes: Routes = [
  {
    path: '',
    component: HospLayoutsComponent,
    resolve: {
      hospData: HospDataResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hosp-appl-list',
      },
      {
        path: 'hosp-appl-list',
        component: HospApplListComponent,
      },
      {
        path: 'hcprogram-mgmt',
        component: HcprogramMgmtComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospRoutingModule {}
