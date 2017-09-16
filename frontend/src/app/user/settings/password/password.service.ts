/**
 * Created by Administrator on 2017/8/19.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class PasswordService {
  constructor(private http: Http) { }

  passwordUrl:string =  `${SITE_HOST_URL}/user/password`

  changePassword(data: any) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http
      .put(this.passwordUrl, body, options);
  }
}
