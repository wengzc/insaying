/**
 * Created by Administrator on 2017/8/18.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class BasicsService {
  constructor(private http: Http) { }

  basicsUrl:string =  `${SITE_HOST_URL}/user/basics`

  changeBasics(data: any) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http
      .put(this.basicsUrl, body, options);
  }
}
