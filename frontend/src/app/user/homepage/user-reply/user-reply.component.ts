/**
 * Created by Administrator on 2017/8/23.
 */
/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';

import { UserReplyService } from './user-reply.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'user-reply',
  templateUrl: './user-reply.component.html',
  styleUrls: ['./user-reply.component.css'],
  providers: [ UserReplyService ]
})
export class UserReplyComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public router: Router,
    private userReplyService: UserReplyService,
  ) { }

  serverUrl: string = SITE_HOST_URL;
  user: any;
  user_id: string;
  comments: any;
  commentsPage: string;
  activeCommentsPage: number = 1;
  commentsCount: number;
  lastPage: boolean;

  ngOnInit() {
    this.user_id = this._activatedRoute.parent.snapshot.params['id'];
    this.getUserComments(1);
    // this._activatedRoute.queryParams
    //   .forEach((queryParams) => this.getUserComments());
  }

  getUserComments(activeCommentsPage) {
    // this.commentsPage = this._activatedRoute.snapshot.queryParams['commentsPage'];
    // if(this.commentsPage) {
    //   this.activeCommentsPage = +this.commentsPage;
    // }
    if(activeCommentsPage) {
      this.activeCommentsPage = activeCommentsPage;
    }
    let data = {
      user_id: this.user_id,
      activeCommentsPage: this.activeCommentsPage
    }
    this.userReplyService.getUserComments(data).subscribe( comments => {
      let body = comments.json();
      this.comments = body.comments;
      this.commentsCount = body.commentsCount;
      this.lastPage = (this.commentsCount/10) <= this.activeCommentsPage;
    })
  }

  prevPage() {
    if(this.activeCommentsPage <= 1) {
      return ;
    }
    this.getUserComments(this.activeCommentsPage - 1);
    // this.router.navigate([`/user/${this.user_id}/reply`], {queryParams: {commentsPage: this.activeCommentsPage-1}});
  }
  nextPage() {
    if((this.commentsCount/10) <= this.activeCommentsPage) {
      return ;
    }
    this.getUserComments(this.activeCommentsPage + 1);
    // this.router.navigate([`/user/${this.user_id}/reply`], {queryParams: {commentsPage: this.activeCommentsPage+1}});
  }
}
