import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'expenses-management',
	templateUrl: './expenses-management.component.html',
	styleUrls: ['./expenses-management.component.scss']
})
export class ExpensesManagementComponent implements OnInit {

	tabs = [
		{
			title: 'Housing',
			route: './housing',
		},
		{
			title: 'Food',
			route: './food',
		},
		{
			title: 'Grocery',
			route: './grocery',
		},
		{
			title: 'Savings',
			route: './savings',
		},
	];

	constructor() { }

	ngOnInit() {
	}

}
