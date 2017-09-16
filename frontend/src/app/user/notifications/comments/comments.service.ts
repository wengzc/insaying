/**
 * Created by Administrator on 2017/9/12.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class CommentsService {
  constructor(private http: Http) { }

  commentsUrl:string = `${SITE_HOST_URL}/user/received/comments`;

  getUserReceivedComments(user_id) {
    return this.http.get(this.commentsUrl + `?user_id=${user_id}`, { withCredentials: true });
  }

  setCommentStatus(data) {
  let body = JSON.stringify(data);
  let headers = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: headers, withCredentials: true});
  return this.http.put(this.commentsUrl , body, options);
}

}
