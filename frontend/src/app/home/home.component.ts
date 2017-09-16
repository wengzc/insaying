/**
 * Created by Administrator on 2017/8/5.
 */
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

import { ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService],
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  articles: any;
  articlesCount: number;
  index: string;
  activePage: number = 1;
  lastPage: boolean;

  ngOnInit() {
    this._activatedRoute.params
      .forEach((params: Params) => this.getArticleList())
  }

  getArticleList() {
    this.index = this._activatedRoute.snapshot.params['index'];
    if(this.index) {
      this.activePage = +this.index;
    }
    this.homeService.getArticleList(this.activePage).subscribe( articles => {
      let body = articles.json();
      this.articles = body.articles;
      this.articlesCount = body.articlesCount;
      this.lastPage = (this.articlesCount/10) <= this.activePage;
    })
  }

  prevPage() {
  if(this.activePage <= 1) {
    return ;
  }
  this.router.navigate(['/article/page', this.activePage-1]);
}
  nextPage() {
    if((this.articlesCount/10) <= this.activePage) {
      return ;
    }
    this.router.navigate(['/article/page', this.activePage+1]);
  }

}
