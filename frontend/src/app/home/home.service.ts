/**
 * Created by Administrator on 2017/8/11.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../shared/config/index';


@Injectable()
export class HomeService {
  constructor(private http: Http) { }

  private articleList = `${SITE_HOST_URL}/article/`;

  getArticleList (activePage) {
    return this.http.get(this.articleList + "page/" + activePage, { withCredentials: true });
  }

}
