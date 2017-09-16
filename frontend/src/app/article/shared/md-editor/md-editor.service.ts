/**
 * Created by Administrator on 2017/9/10.
 */
/**
 * Created by Administrator on 2017/9/10.
 */
/**
 * Created by Administrator on 2017/9/10.
 */
/**
 * Created by Administrator on 2017/8/10.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Injectable()
export class MdEditorService {

  private articleUrl = `${SITE_HOST_URL}/article/`;

  constructor(private http:Http) { }

  getArticleContent(article_id: string) {
    return this.http.get(this.articleUrl + article_id, { withCredentials: true });
  }

}
