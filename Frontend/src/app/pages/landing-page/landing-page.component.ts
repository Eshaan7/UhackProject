import { Component, OnInit } from '@angular/core';
import { Housing } from '../../@core/models/models';
import { Router } from '@angular/router';
import { UserService } from '../../@core/utils/user.service';
import { User } from '../../@core/models/users';
import { Subscription } from 'rxjs';
import { DataService } from '../../@core/utils/data.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  user: User;
  housing: Housing;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private router: Router, private userService: UserService, private http: DataService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.housing = this.userService.housing;
    this.sub1 = this.userService.user$.subscribe(res => this.user = res);
		this.sub2 = this.userService.housing$.subscribe(res => this.housing = res);
  }

  ngOnDestroy(): void {
		try {
      this.sub1.unsubscribe();
			this.sub2.unsubscribe();
		} catch (e) {
			console.error(e);
		}
	}

  async continue() {
    try {
      await this.http.put(this.user, {}, 'user');
      await this.http.put(this.housing, {}, 'housing');
    } catch(e) {
      console.error(e);
    }
    this.router.navigate(['/pages/dashboard']);
  }

}
