/**
 * Created by Administrator on 2017/8/10.
 */
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_HOST_URL } from '../shared/config/index';

@Injectable()
export class ArticleService {
  constructor(private http:Http) { }

}
