/**
 * Created by Administrator on 2017/9/9.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class AuthorSidebarService {

  private userUrl = `${SITE_HOST_URL}/user`;

  constructor(private http: Http) { }

  // getUser (user_id: string) {
  //   return this.http.get(this.userUrl + `/${user_id}`, { withCredentials: true });
  // }
}
