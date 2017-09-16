/**
 * Created by Administrator on 2017/9/9.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';


@Injectable()
export class UserLikeService {
  constructor(private http: Http) { }

  private articleListUrl = `${SITE_HOST_URL}/article`;

  getUserLikes (data) {
    return this.http.get(this.articleListUrl + '/user/like' + `?user_id=${data.user_id}&activePage=${data.activePage}`, { withCredentials: true });
  }

}
