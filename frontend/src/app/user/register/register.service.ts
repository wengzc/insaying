/**
 * Created by Administrator on 2017/8/1.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class RegisterService {

  private registerUrl = `${SITE_HOST_URL}/user`;

  constructor(private http: Http) { }


  addUser(data: any) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http
      .post(this.registerUrl, body, options);
  }


  }
