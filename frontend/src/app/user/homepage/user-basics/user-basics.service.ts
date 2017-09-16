/**
 * Created by Administrator on 2017/8/18.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class UserBasicsService {
  constructor(private http: Http) { }

  private userUrl = `${SITE_HOST_URL}/user`;

  getUser (user_id: string) {
    return this.http.get(this.userUrl + `/${user_id}`, { withCredentials: true });
  }
}
