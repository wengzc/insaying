/**
 * Created by Administrator on 2017/8/14.
 */
/**
 * Created by Administrator on 2017/8/9.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ArticleEditService } from './article-edit.service';

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleEditService]
})
export class ArticleEditComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    public router: Router,
    private location: Location,
    private articleEditService :ArticleEditService
  ) { }
  title: string;
  content: string;
  initialValue: string;
  errorMsg1: string;
  errorMsg2: string;
  alert: any = { msg: '' };
  publishResult: boolean = false;
  article: any;
  article_id: string;

  ngOnInit() {
    this.article_id = this._activatedRoute.snapshot.params['id'];
    this.getArticleContent(this.article_id);
  }

  getArticleContent(article_id) {
    this.articleEditService.getArticleContent(article_id).subscribe( article => {
      let body = article.json();
      this.article = body.article;
      this.title = this.article.title;
      // this.initialValue = this.article.content;
    })
  }

  smdChange(mdValue: any) {
    this.content = mdValue;
    this.errorMsg1 = '';
    this.errorMsg2 = '';
  }

  check() {
    if(!this.title) {
      this.errorMsg1 = '标题不能为空,无法更新!';
      return false;
    }
    if (this.title.length < 5 || this.title.length > 30){
      this.errorMsg1 = '标题字数应大于5, 无法更新!';
      return false;
    }
    if (!this.content) {
      this.errorMsg2 = '文章并无修改,无法更新!';
      return false;
    }
    if (this.content.length < 100 || this.content.length > 10000){
      this.errorMsg2 = '文章字数应大于100,无法更新!';
      return false;
    }
    return true;
  }

  update() {
    if(!this.check()) {
      return ;
    } else {
      this.articleEditService.updateArticle({
        article_id: this.article_id,
        title: this.title,
        content: this.content
      }).subscribe((res: any) => {
        this.publishResult = true;
        let body = res.json();
        this.alert.msg = body.message;
        this.article = body.article;
        new Observable(observer => {
          observer.next();
        }).delay(2000).subscribe(data => {
          this.router.navigate(['/article', this.article_id]);
        });
      }, (error: any) => {
        console.error(error);
      })
    }
  }

  valueChange(){
    this.errorMsg1 = '';
    this.errorMsg2 = '';
  }

  goBack(): void {
    this.location.back();
  }
}
