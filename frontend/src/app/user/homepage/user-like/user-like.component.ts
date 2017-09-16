/**
 * Created by Administrator on 2017/9/9.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';

import { UserLikeService } from './user-like.service';

@Component({
  selector: 'user-like',
  templateUrl: './user-like.component.html',
  styleUrls: ['./user-like.component.css'],
  providers: [UserLikeService]
})
export class UserlikeComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public router: Router,
    private userLikeService: UserLikeService
  ) {

  }
  likes: any;
  articlelist;
  likesCount: number;
  index: string;
  activePage: number = 1;
  lastPage: boolean;
  user_id: string;

  ngOnInit() {
    this.user_id = this._activatedRoute.parent.snapshot.params['id'];
    this.getArticlelikes(1);
  }

  getArticlelikes(activePage) {
    if(activePage) {
      this.activePage = activePage
    }
    let data = {
      user_id: this.user_id,
      activePage: this.activePage
    }
    this.userLikeService.getUserLikes(data).subscribe( articles => {
      let body = articles.json();
      this.likes = body.likes;
      this.articlelist = this.likes.map( like => like.article );
      this.likesCount = body.likesCount;
      this.lastPage = (this.likesCount/10) <= this.activePage;
    })
  }

  prevPage() {
    if(this.activePage <= 1) {
      return ;
    }
    this.getArticlelikes(this.activePage - 1);
  }
  nextPage() {
    if((this.likesCount/10) <= this.activePage) {
      return ;
    }
    this.getArticlelikes(this.activePage + 1);
  }

}
