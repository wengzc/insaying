/**
 * Created by Administrator on 2017/8/6.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class LoginService{
  private loginUrl = `${SITE_HOST_URL}/user/session`;

  constructor(private http: Http){ }

  login(data: any) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(this.loginUrl, body, options);
  }

}
