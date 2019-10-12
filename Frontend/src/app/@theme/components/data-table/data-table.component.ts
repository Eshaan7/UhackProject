import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../@core/utils/data.service';
import {NbCalendarRange} from '@nebular/theme';
import {UserService} from '../../../@core/utils/user.service';

export interface Column {
	name: string;
	sortable?: boolean;
	filter?: boolean;
	displayName: string;
	filterFn?: () => {};
	sortFn?: () => {};
	displayFn?: (row: any, column: any) => {};
}

@Component({
	selector: 'ngx-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
	@Input()
	columns: Column[] = [];
	@Input()
	dialogInputColumn: any[] = [];
	@Input()
	dialogCheckboxColumn: any[] = [];
	@Input()
	dialogDropdownColumn: any[] = [];
	@Input()
	filters: any[] = [];
	@Input()
	only: string[] = undefined;
	@Input()
	include: string[] = undefined;
	@Input()
	path: string;
	@Input()
	addNew = true;
	@Input()
	searchIcon = true;
	@Input()
	footer = true;
	@Input()
	inputQuery: any = {};
	@Input()
	infoIcon: boolean = false;
	@Input()
	searchFields: any[] = [];
	page: number = 1;
	totalPages: any;
	currPage: number;
	limit = 10;
	data: any[] = [];
	query: any = {};

	@Output() view: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('inputVal', { static: true })
	public formelement: ElementRef;

	constructor(private http: DataService, private router: Router, private userService: UserService) {
		this.currPage = 1;
		this.totalPages = 1;
	}

	ngOnInit() {
	}

	async nextPage() {
		this.currPage = (this.currPage < this.totalPages) ? (this.currPage + 1) : this.currPage;
		this.page = this.currPage;
		await this.loadData();
	}

	async previousPage() {
		this.currPage = (this.currPage > 1) ? (this.currPage - 1) : this.currPage;
		this.page = this.currPage;
		await this.loadData();
	}

	async setPage() {
		this.currPage = (this.currPage > this.totalPages) ? this.totalPages : ((this.currPage <= 0) ? 1 : this.currPage);
		this.page = this.currPage;
		await this.loadData();
	}

	ngAfterViewInit() {
		this.loadData().then();
	}

	async search() {
		this.page = 1;
		this.loadData().then();
	}

	async loadData() {
		try {
			const data = await this.getData();
			console.log(data);
			this.data = data;
			this.totalPages = Math.ceil(data.total / this.limit);
		} catch (e) {
			this.data = [];
		}
	}


	getData(): Promise<any> {
		// this.query.__page = this.page;
		// this.query.__only = this.only;
		// this.query.__include = this.include;
		// this.query.__limit = this.limit;
		// this.query.__retail_shop_id__in = this.outletIds;
		// this.query.__outlet_id__in = this.outletIds;

		// if (this.searchFields) {
		// 	this.searchFields.forEach(s => {
		// 		if (s.hasOwnProperty('term') && s.term) {
		// 			this.query[s.value] = s.term;
		// 		} else {
		// 			delete this.query[s.value];
		// 		}
		// 	});
		// }
		// if (this.path.indexOf('report') > -1) {
		// } else {
		// }


		// for (const i in this.inputQuery) {
		// 	if (this.inputQuery.hasOwnProperty(i)) {
		// 		this.query[i] = this.inputQuery[i];
		// 	}
		// }
		return this.http.query({},this.path);
	}

	// applyFilter(filter: any, value: boolean) {
	// 	if (value) {
	// 		this.query[filter.value] = true;
	// 	} else {
	// 		this.query[filter.value] = undefined;
	// 	}
	// 	this.page = 1;
	// 	this.loadData().then();
	// }
	
}
