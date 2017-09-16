/**
 * Created by Administrator on 2017/8/21.
 */
/**
 * Created by Administrator on 2017/8/11.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';


@Injectable()
export class ArticleListService {
  constructor(private http: Http) { }

  private articleList = `${SITE_HOST_URL}/article`;
  getArticleList () {
    return this.http.get(this.articleList, { withCredentials: true });
  }

}
