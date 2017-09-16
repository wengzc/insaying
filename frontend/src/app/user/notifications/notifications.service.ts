/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/10.
 */
import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class NotificationsService {

  private userUrl = `${SITE_HOST_URL}/user`;

  constructor(private http: Http) { }

  getUserNewReceivedCommentsCount(user_id: string) {
    return this.http.get(this.userUrl + '/received/new/comments/count' + `?user_id=${user_id}`, { withCredentials: true });
  }

  getUserNewReceivedLikesCount(user_id: string) {
    return this.http.get(this.userUrl + '/received/new/likes/count' + `?user_id=${user_id}`, { withCredentials: true });
  }

  getUserNewReceivedVotesCount(user_id: string) {
    return this.http.get(this.userUrl + '/received/new/votes/count' + `?user_id=${user_id}`, { withCredentials: true });
  }
}
