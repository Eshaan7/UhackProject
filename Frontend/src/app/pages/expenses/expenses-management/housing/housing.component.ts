import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss']
})
export class HousingComponent implements OnInit {

	columns = [
		// {
		// 	name: 'address',
		// 	displayName: 'Population',
    // },
    {
      name: "Address",
      displayName: "Address",
    },
    {
      name: 'Price',
      displayName: 'Price',
      displayFn: (v => '$' + Math.floor(v["Price"])), 

    },
    {
      name: 'Avg. Area Number of Bedrooms',
      displayName: 'Avg. Area Number of Bedrooms',
      displayFn: (v => Math.floor(v["Avg. Area Number of Bedrooms"])), 
    },
    {
      name: 'Avg. Area Income',
      displayName: 'Avg. Area Income',
      displayFn: (v => '$' + Math.floor(v["Avg. Area Income"])), 
    },
	];

  constructor() { }

  ngOnInit() {
  }

}
