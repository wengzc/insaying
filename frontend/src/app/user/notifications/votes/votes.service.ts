/**
 * Created by Administrator on 2017/9/13.
 */
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
export class VotesService {
  constructor(private http: Http) { }

  votesUrl:string = `${SITE_HOST_URL}/user/received/votes`;

  getUserReceivedVotes(user_id) {
    return this.http.get(this.votesUrl + `?user_id=${user_id}`, { withCredentials: true });
  }

  setVotesStatus(data) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.put(this.votesUrl , body, options);
  }
}
