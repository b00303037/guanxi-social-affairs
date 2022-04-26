import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './pages/apply/apply.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { NewsComponent } from './pages/news/news.component';
import { QueryComponent } from './pages/query/query.component';
import { LayoutsComponent } from './shared/layouts/layouts.component';

import { HomeDataResolver } from './shared/resolvers/home-data.resolver';
import { HospDataResolver } from './shared/resolvers/hosp-data.resolver';
import { SettingsResolver } from './shared/resolvers/settings.resolver';

const routes: Routes = [
  {
    path: 'govt',
    loadChildren: () =>
      import('./pages/govt/govt.module').then((m) => m.GovtModule),
    canLoad: [
      // TODO check govt-token
    ],
  },
  {
    path: 'hosp',
    loadChildren: () =>
      import('./pages/hosp/hosp.module').then((m) => m.HospModule),
    canLoad: [
      // TODO check hosp-token
    ],
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          homeData: HomeDataResolver,
        },
      },
      {
        path: 'news-list',
        component: NewsListComponent,
      },
      {
        path: 'news/:id',
        component: NewsComponent,
      },
      {
        path: 'apply',
        component: ApplyComponent,
        resolve: {
          hospData: HospDataResolver,
          settings: SettingsResolver,
        },
      },
      {
        path: 'query',
        component: QueryComponent,
        resolve: {
          hospData: HospDataResolver,
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
