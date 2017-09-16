/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class LikesService {
  constructor(private http: Http) { }

  likesUrl:string = `${SITE_HOST_URL}/user/received/likes`;

  getUserReceivedLikes(user_id) {
    return this.http.get(this.likesUrl + `?user_id=${user_id}`, { withCredentials: true });
  }

  setLikesStatus(data) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.put(this.likesUrl , body, options);
  }

}
