import { Component, OnInit } from '@angular/core';
import { landingData } from '../../@core/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  landingData: landingData = {} as landingData;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  continue() {
    this.router.navigate(['/pages/dashboard']);
  }

}
