import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// ngx-owl-carousel-o
import { CarouselModule } from 'ngx-owl-carousel-o';

// @angular/material

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// shared
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// layouts
import { LayoutsComponent } from './shared/layouts/layouts.component';

// pages
import { HomeComponent } from './pages/home/home.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { NewsComponent } from './pages/news/news.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { ApplyVerificationStepComponent } from './pages/apply/apply-verification-step/apply-verification-step.component';
import { ApplyHCProgramStepComponent } from './pages/apply/apply-hcprogram-step/apply-hcprogram-step.component';
import { ApplyBasicInfoStepComponent } from './pages/apply/apply-basic-info-step/apply-basic-info-step.component';
import { ApplyIDPhotosStepComponent } from './pages/apply/apply-idphotos-step/apply-idphotos-step.component';
import { QueryComponent } from './pages/query/query.component';
import { QueryVerificationStepComponent } from './pages/query/query-verification-step/query-verification-step.component';
import { QueryApplListStepComponent } from './pages/query/query-appl-list-step/query-appl-list-step.component';

// @angular/common
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeZhHant from '@angular/common/locales/zh-Hant';

registerLocaleData(localeZhHant);

@NgModule({
  declarations: [
    // layouts
    LayoutsComponent,
    // pages
    AppComponent,
    HomeComponent,
    NewsListComponent,
    NewsComponent,
    ApplyComponent,
    ApplyVerificationStepComponent,
    ApplyHCProgramStepComponent,
    ApplyBasicInfoStepComponent,
    ApplyIDPhotosStepComponent,
    QueryComponent,
    QueryVerificationStepComponent,
    QueryApplListStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // ngx-owl-carousel-o
    CarouselModule,
    // @angular/material
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    // shared
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'zh-Hant' }, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
