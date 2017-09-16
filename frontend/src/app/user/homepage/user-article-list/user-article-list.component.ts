/**
 * Created by Administrator on 2017/8/22.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';

import { UserArticleListService } from './user-article-list.service';

@Component({
  selector: 'user-article-list',
  templateUrl: './user-article-list.component.html',
  styleUrls: ['./user-article-list.component.css'],
  providers: [UserArticleListService]
})
export class UserArticleListComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public router: Router,
    private userArticleListService: UserArticleListService
  ) { }
  articleList: any;
  articlesCount: number;
  index: string;
  activePage: number = 1;
  lastPage: boolean;
  user_id: string;

  ngOnInit() {
    this.user_id = this._activatedRoute.parent.snapshot.params['id'];
    this.getArticleList(1);
    // this._activatedRoute.params
    //   .forEach((params: Params) => this.getArticleList())
  }

  getArticleList(activePage) {
    // this.index = this._activatedRoute.snapshot.params['index'];
    // if(this.index) {
    //   this.activePage = +this.index;
    // }
    if(activePage) {
      this.activePage = activePage
    }
    let data = {
      user_id: this.user_id,
      activePage: this.activePage
    }
    this.userArticleListService.getUserArticleList(data).subscribe( articles => {
      let body = articles.json();
      this.articleList = body.articles;
      this.articlesCount = body.articlesCount;
      this.lastPage = (this.articlesCount/10) <= this.activePage;
    })
  }

  prevPage() {
    if(this.activePage <= 1) {
      return ;
    }
    this.getArticleList(this.activePage - 1);
    // this.router.navigate([`/user/${this.user_id}/article/page`, this.activePage-1]);
  }
  nextPage() {
    if((this.articlesCount/10) <= this.activePage) {
      return ;
    }
    this.getArticleList(this.activePage + 1);
    // this.router.navigate([`/user/${this.user_id}/article/page`, this.activePage+1]);
  }

}
