/**
 * Created by Administrator on 2017/8/17.
 */
/**
 * Created by Administrator on 2017/8/11.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';


@Injectable()
export class HomepageService {
  constructor(private http: Http) { }

  private userUrl = `${SITE_HOST_URL}/user`;

  getUser (user_id: string) {
    return this.http.get(this.userUrl + `/${user_id}`, { withCredentials: true });
  }

  getUserReceivedLikesCount(user_id) {
    return this.http.get(this.userUrl + "/received/likes/count" + `?user_id=${user_id}`, { withCredentials: true });
  }

  getUserLikesCount(user_id) {
    return this.http.get(this.userUrl + "/likes/count" + `?user_id=${user_id}`, { withCredentials: true });
  }

  getUserArticlesCount(user_id) {
    return this.http.get(this.userUrl + "/articles/count" + `?user_id=${user_id}`, { withCredentials: true });
  }

}
