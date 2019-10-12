import { NgModule } from '@angular/core';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesManagementComponent } from './expenses-management/expenses-management.component';
import { ThemeModule } from '../../@theme/theme.module';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbRouteTabsetModule,
} from '@nebular/theme';
import { HousingComponent } from './expenses-management/housing/housing.component';
import { FoodComponent } from './expenses-management/food/food.component';
import { GroceryComponent } from './expenses-management/grocery/grocery.component';
import { SavingsComponent } from './expenses-management/savings/savings.component';

@NgModule({
  declarations: [ExpensesManagementComponent, HousingComponent, FoodComponent, GroceryComponent, SavingsComponent],
  imports: [
    ThemeModule,
    ExpensesRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbListModule,
    NbRadioModule,
    NbRouteTabsetModule,
  ]
})
export class ExpensesModule { }
