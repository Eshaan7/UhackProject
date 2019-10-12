import {Injectable} from '@angular/core';
import {HttpService} from '../../config/http.service';
import {HttpClient} from '@angular/common/http';
import {NbAuthService} from '@nebular/auth';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import { IndexedDbService } from '../../config/indexdb.service';
//import {User} from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<any> {
  user: any = {id: null};
  redirectUrl: string;
  statuses: any;

  user$: Subject<any> = new Subject() as Subject<any>;

  constructor(private httpClient: HttpClient, private router: Router, private nbAuth: NbAuthService, public indexDB: IndexedDbService) {
    super(httpClient, {
      path: '/user',
    }, indexDB);

    this.nbAuth.onTokenChange().subscribe((res) => {
      this.init().then();
    });
  }

  getUser$(): Observable<any> {
    return this.user$.asObservable();
  }

  async init() {
    try {
      const user = await this.getUser();
      this.user = user.data[0];
  
      // this.messagingService.requestPermission(this.user.id);
      this.user$.next(this.user);
    } catch (e) {
      console.error(e);
      this.logOut();
    }
  }

  async getUser(): Promise<any> {
    return this.query();
  }

  logOut() {
    this.nbAuth.logout('email').subscribe(() => {
      localStorage.removeItem('auth_app_token');
      // location.reload();
    }, () => {
      localStorage.removeItem('auth_app_token');
      // location.reload();
    });
  }

  isLoggedIn() {
    return true;
  }
}
