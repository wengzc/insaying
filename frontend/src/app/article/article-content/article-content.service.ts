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
export class ArticleContentService {
  private articleUrl = `${SITE_HOST_URL}/article/`;
  private commentUrl = `${SITE_HOST_URL}/comment/`;
  private likeUrl = `${SITE_HOST_URL}/like/`;
  private voteUrl = `${SITE_HOST_URL}/vote/`;
  private userUrl = `${SITE_HOST_URL}/user/`;

  constructor(private http:Http) { }

  deleteArticle(article_id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(this.articleUrl + article_id, options);
  }

  getArticleContent(article_id: string) {
    return this.http.get(this.articleUrl + article_id, { withCredentials: true });
  }

  getOtherArticles(article_id: string) {
    return this.http.get(this.articleUrl + 'others' + `?article_id=${article_id}`, { withCredentials: true });
  }

  like(data) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.likeUrl, body, options);
  }
  cancelLike(data) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(this.likeUrl + `?article=${data.article}`, options);
  }
  getArticleLikes(data) {
    return this.http.get(this.articleUrl + "likes" + `?article=${data.article}`, { withCredentials: true });
  }

  publishReply(reply) {
    let body = JSON.stringify(reply);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.commentUrl + 'reply', body, options);
  }

  vote(data) {
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.voteUrl, body, options);
  }
  cancelVote(data) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(this.voteUrl + `?comment=${data.comment}`, options);
  }

  publicComment(comment: any) {
    let body = JSON.stringify(comment);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.commentUrl, body, options);
  }

  getCommentList(data) {
    return this.http.get(this.articleUrl + data.article_id + '/comment' + `?activeCommentsPage=${data.activeCommentsPage}`, { withCredentials: true });
  }

  deleteComment(comment) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(this.commentUrl + `/${comment._id}`, options);
  }

  getAuthorReceivedLikesCount(user_id) {
    return this.http.get(this.userUrl + "received/likes/count" + `?user_id=${user_id}`, { withCredentials: true });
  }

}
