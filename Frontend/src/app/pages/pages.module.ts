import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ExpensesModule } from './expenses/expenses.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    LandingPageModule,
    ExpensesModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
