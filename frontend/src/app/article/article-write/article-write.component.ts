/**
 * Created by Administrator on 2017/8/9.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import { ArticleWriteService } from './article-write.service';

@Component({
  selector: 'article-write',
  templateUrl: './article-write.component.html',
  styleUrls: ['./article-write.component.css'],
  providers: [ArticleWriteService]
})
export class ArticleWriteComponent implements OnInit {

  constructor(
    public router: Router,
    private location: Location,
    private articleWriteService :ArticleWriteService
  ) { }
  title: string;
  content: string;
  errorMsg1: string;
  errorMsg2: string;
  alert:any = { msg: '' };
  publishResult: boolean = false;
  article: any;


  ngOnInit() {
  }
  smdChange(mdValue: any) {
    this.content = mdValue;
    this.errorMsg1 = '';
    this.errorMsg2 = '';
  }

  check() {
    if(!this.title) {
      this.errorMsg1 = '标题不能为空,无法发布!';
      return false;
    }
    if (this.title.length < 5 || this.title.length > 30){
      this.errorMsg1 = '标题字数应大于5, 无法发布!';
      return false;
    }
    if (!this.content) {
      this.errorMsg2 = '文章内容不能为空,无法发布!';
      return false;
    }
    if (this.content.length < 100 || this.content.length > 10000){
      this.errorMsg2 = '文章字数应大于100,无法发布!';
      return false;
    }
    return true;
  }

  publish() {
    if(!this.check()) {
      return ;
    } else {
      this.articleWriteService.publicAticle({
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
            this.router.navigate(['/article', this.article._id]); // 跳到首页
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
