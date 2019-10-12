import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from '../@core/utils/auth-gaurd.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      component: LandingPageComponent,
      // redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
			path: 'expenses-management', loadChildren: () => import('../pages/expenses/expenses.module')
				.then(m => m.ExpensesModule),
			canActivate: [AuthGuard],
		},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
