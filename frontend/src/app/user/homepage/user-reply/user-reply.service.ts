/**
 * Created by Administrator on 2017/8/23.
 */
/**
 * Created by Administrator on 2017/8/18.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class UserReplyService {
  constructor(private http: Http) { }

  private userUrl = `${SITE_HOST_URL}/user`;

  getUserComments(data) {
    return this.http.get(this.userUrl + `/${data.user_id}` + '/comments' + `?activeCommentsPage=${data.activeCommentsPage}`, { withCredentials: true });
  }

}
