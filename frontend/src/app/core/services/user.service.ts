/**
 * Created by Administrator on 2017/8/6.
 */

import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { UserModel } from '../../shared/models/user.model';
import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class UserService {
  public isLogin: boolean;
  public userInfo: UserModel;
  private getUserInfoUrl = `${SITE_HOST_URL}/user`;
  private signoutUrl = `${SITE_HOST_URL}/user/session`;
  constructor(private http: Http) { }

  getUser() {
    return this.http.get(this.getUserInfoUrl,{ withCredentials: true })
      .subscribe((res: any) => {
      let body = res.json();
      this.isLogin = body.isLogin;
      this.userInfo = body.user;
    });
  }

  getUserWithoutSubscribe() {
    return this.http.get(this.getUserInfoUrl,{ withCredentials: true });
  }

  authGuard(){
    return this.http.get(this.getUserInfoUrl,{ withCredentials: true });
}

  signout() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(this.signoutUrl, options);
  }
}
