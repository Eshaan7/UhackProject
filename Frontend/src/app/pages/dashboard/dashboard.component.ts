import { Component } from '@angular/core';
import { UserService } from '../../@core/utils/user.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  prev_data = {
    'housing': this.userService.housing.prediction2 / 300,
    'food': 600,
    'grocery': 300,
    'savings': this.userService.user.previous_salary / 12 - this.userService.housing.prediction2 / 300 - 730 - 340
  }

  new_data = {
    'housing': this.userService.housing.prediction1 / 300,
    'food': 730,
    'grocery': 340,
    'savings': this.userService.user.expected_salary / 12 - this.userService.housing.prediction1 / 300 - 730 - 340
  }

  graphData1 = [
    {
      name: 'Housing',
      value: this.prev_data['housing']
    },
    {
      name: 'Food',
      value: this.prev_data['food'],
    },
    {
      name: 'Grocery',
      value: this.prev_data['grocery'],
    },
    {
      name: 'Savings',
      value: this.prev_data['savings']
    },
  ];

  graphData2 = [
    {
      name: 'Housing',
      value: this.new_data['housing'],
    },
    {
      name: 'Food',
      value: this.new_data['food'],
    },
    {
      name: 'Grocery',
      value: this.new_data['grocery'],
    },
    {
      name: 'Savings',
      value: this.new_data['savings']
    },
  ];

  horizontalbarData = [
    {
      "name": "Housing",
      "series": [
        {
          "name": this.userService.user.where_from,
          "value": this.prev_data['housing']
        },
        {
          "name": this.userService.user.where_to,
          "value": this.new_data['housing']
        }
      ]
    },

    {
      "name": "Food",
      "series": [
        {
          "name": this.userService.user.where_from,
          "value": this.prev_data['food']
        },
        {
          "name": this.userService.user.where_to,
          "value": this.new_data['food']
        }
      ]
    },

    {
      "name": "Grocery",
      "series": [
        {
          "name": this.userService.user.where_from,
          "value": this.prev_data['grocery']
        },
        {
          "name": this.userService.user.where_to,
          "value": this.new_data['grocery']
        }
      ]
    },

    {
      "name": "Savings",
      "series": [
        {
          "name": this.userService.user.where_from,
          "value": this.prev_data['savings']
        },
        {
          "name": this.userService.user.where_to,
          "value": this.new_data['savings']
        }
      ]
    }
];

constructor(private userService: UserService) { }

}