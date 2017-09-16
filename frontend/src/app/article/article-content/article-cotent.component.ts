/**
 * Created by Administrator on 2017/8/10.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

import { ArticleContentService } from  './article-content.service';
import { UserService } from '../../core/services/index';

@Component({
  selector: 'article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css'],
  providers: [ArticleContentService]
})
export class ArticleContentComponent implements OnInit {

  article: any;
  otherArticles: any;
  article_id: string;
  html: any;
  comments: any;
  commentValue: string;
  errorMsg: string;
  alert:any = { msg: '' };
  commentPublishResult: boolean = false;
  commentsPage: string;
  activeCommentsPage: number = 1;
  commentsCount: number;
  lastPage: boolean;
  likes: any;
  likePassed: boolean = false;
  votePassed: boolean = false;
  authorReceivedlikesCount: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private articleContentService: ArticleContentService,
    public userService: UserService
  ) { }

  ngOnInit() {
    let rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
    this._activatedRoute.params.subscribe( (params:Params) => {
      this.article_id = '';
      this.article_id = params['id'];
      this.getArticleContent(this.article_id);
      this.getOtherArticles(this.article_id);
      this.getArticleLikes();
      this._activatedRoute.queryParams
        .forEach((queryParams) => this.getCommentList());
    })
  }

  getArticleContent(article_id) {
    this.articleContentService.getArticleContent(article_id).subscribe( article => {
      let body = article.json();
      this.article = body.article;
      this.article.content = marked(this.article.content);
      this.html = this.article.content;
      this.getAuthorReceivedLikesCount(this.article.author._id);
    })
  }

  getAuthorReceivedLikesCount(user_id) {
    this.articleContentService.getAuthorReceivedLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.authorReceivedlikesCount = body.receivedlikesCount;
    })
  }

  getOtherArticles(article_id) {
    this.articleContentService.getOtherArticles(article_id).subscribe( others => {
      let body = others.json();
      this.otherArticles = body.otherArticles;
      if(this.otherArticles.length > 15) {
        this.otherArticles = this.otherArticles.slice(0, 16);
      }
    })
  }

  deleteArticle() {
    this.articleContentService.deleteArticle(this.article_id).subscribe( (res) => {
      let body = res.json();
      this.router.navigate(['/']);
    })
  }

  like(article) {
    if(!this.userService.isLogin) {
      this.router.navigate(['/user/login']);
      return false;
    }
    if(!this.likePassed) {
      this.articleContentService.like({
        receiver: article.author._id,
        article: article._id
      }).subscribe( res => {
        this.likePassed = true;
        this.getArticleLikes();
      })
    } else {
      this.articleContentService.cancelLike({
        article: article._id
      }).subscribe( res => {
        this.likePassed = false;
        this.getArticleLikes();
      })
    }
  }

  getArticleLikes() {
    this.articleContentService.getArticleLikes({ article: this.article_id }).subscribe( res => {
      let body = res.json();
      this.likes = body.likes;
      this.likePassed = !this.likes.every( element => element.user._id !== this.userService.userInfo._id);
    });
  }

  getCommentList() {
    this.commentsPage = this._activatedRoute.snapshot.queryParams['commentsPage'];
    if(this.commentsPage) {
      this.activeCommentsPage = +this.commentsPage;
    }
    let data = {
      article_id: this.article_id,
      activeCommentsPage: this.activeCommentsPage
    }
    this.articleContentService.getCommentList(data).subscribe( comments => {
      let body = comments.json();
      body.comments = body.comments.map( (comment) => {
        comment.lightenZan = !comment.votes.every( element => element.user._id !== this.userService.userInfo._id );
        return comment;
      })
      this.comments = body.comments;
      this.commentsCount = body.commentsCount;
      this.lastPage = (this.commentsCount/10) <= this.activeCommentsPage;
    })
  }

  publishComment() {
    if(!this.commentCheck()){
      return ;
    } else {
      this.article_id = this._activatedRoute.snapshot.params['id'];
      this.articleContentService.publicComment({
        content: this.commentValue,
        article_id: this.article_id,
        receiver: this.article.author._id
      }).subscribe( res => {
        this.commentValue = '';
        let body = res.json();
        this.commentPublishResult = true;
        this.alert.msg = body.message;
        this._activatedRoute.queryParams
          .forEach((queryParams) => this.getCommentList());
        setTimeout(() =>{
          this.alert.msg = '';
          this.commentValue = '';
        }, 3000)
      })
    }
  }

  publishReply(reply) {
    this.article_id = this._activatedRoute.snapshot.params['id'];
    this.articleContentService.publishReply({
      reply_comment: reply.reply_comment,
      root_comment: reply.root_comment,
      root_article: this.article_id,
      receiver: reply.receiver,
      content: reply.content
    }).subscribe( res => {
      this._activatedRoute.queryParams
        .forEach((queryParams) => this.getCommentList());
    })
  }

  vote(comment) {
    if(!this.userService.isLogin) {
      this.router.navigate(['/user/login']);
      return false;
    }
    this.votePassed = !comment.votes.every( element => element.user._id !== this.userService.userInfo._id );
    if(!this.votePassed) {
      this.articleContentService.vote({
        receiver: comment.author._id,
        comment: comment._id,
        root_article: this.article_id
      }).subscribe( res => {
        this.votePassed = true;
        this._activatedRoute.queryParams
          .forEach((queryParams) => this.getCommentList());
      })
    } else {
      this.articleContentService.cancelVote({
        comment: comment._id
      }).subscribe( res => {
        this.votePassed = false;
        this._activatedRoute.queryParams
          .forEach((queryParams) => this.getCommentList());
      })
    }
  }

  deleteComment(comment: any) {
    this.articleContentService.deleteComment(comment).subscribe((res) => {
      let body = res.json();
      this._activatedRoute.queryParams
        .forEach((queryParams) => this.getCommentList());
    })
  }

  commentCheck() {
    if(!this.userService.isLogin) {
      this.errorMsg = '您还没有登陆账号,无法回复!';
      return false;
    }
    if(!this.commentValue) {
      this.errorMsg = '评论不能为空,无法发布!';
      return false;
    }
    if(this.commentValue.length<3) {
      this.errorMsg = '评论不能少于3个字,无法发布!';
      return false;
    }
    return true;
  }

  valueChange(){
    this.errorMsg = '';
  }

  prevPage() {
    if(this.activeCommentsPage <= 1) {
      return ;
    }
    this.router.navigate([`/article/${this.article_id}`], {queryParams: {commentsPage: this.activeCommentsPage-1}});
  }
  nextPage() {
    if((this.commentsCount/10) <= this.activeCommentsPage) {
      return ;
    }
    this.router.navigate([`/article/${this.article_id}`], {queryParams: {commentsPage: this.activeCommentsPage+1}});
  }

}
