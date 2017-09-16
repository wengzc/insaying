/**
 * Created by Administrator on 2017/8/19.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class AvatarService {

  constructor(private http: Http) { }

  avatarUrl:string =  `${SITE_HOST_URL}/user/avatar`

  uploadAvatar(data: any) {
    let avatarData: any = new FormData();
    avatarData.append("files", data);
    let options = new RequestOptions({withCredentials: true});

    return this.http
      .put(this.avatarUrl, avatarData, options);
  }

}
