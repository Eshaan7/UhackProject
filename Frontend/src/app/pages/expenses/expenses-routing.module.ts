import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesManagementComponent } from './expenses-management/expenses-management.component';
import { HousingComponent } from './expenses-management/housing/housing.component';
import { FoodComponent } from './expenses-management/food/food.component';
import { GroceryComponent } from './expenses-management/grocery/grocery.component';
import { SavingsComponent } from './expenses-management/savings/savings.component';

const routes: Routes = [
	{
		path: '',
		component: ExpensesManagementComponent,
		children: [
			{
				path: 'housing',
				component: HousingComponent
			},
			{
				path: 'food',
				component: FoodComponent,
			},
			{
				path: 'grocery',
				component: GroceryComponent,
			},
			{
				path: 'savings',
				component: SavingsComponent,
			},

		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ExpensesRoutingModule { }
