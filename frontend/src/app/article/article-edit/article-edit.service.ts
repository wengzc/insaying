/**
 * Created by Administrator on 2017/9/10.
 */
/**
 * Created by Administrator on 2017/8/10.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../shared/config/index';

@Injectable()
export class ArticleEditService {

  private articleUrl = `${SITE_HOST_URL}/article/`;

  constructor(private http:Http) { }

  getArticleContent(article_id: string) {
    return this.http.get(this.articleUrl + article_id, { withCredentials: true });
  }

  updateArticle(data: any) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.put(this.articleUrl + data.article_id + '/content', body, options);
  }



}
