/**
 * Created by Administrator on 2017/9/12.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { CommentsService } from './comments.service';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [ CommentsService ]
})

export class CommentsComponent implements OnInit {

  serverUrl: string = SITE_HOST_URL;
  user_id: string;
  comments: any;

  constructor(
    private userService: UserService,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.userService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.user_id = body.user._id;
      this.getUserReceivedComments(this.user_id);
    })
  }

  getUserReceivedComments(user_id) {
    this.commentsService.getUserReceivedComments(user_id).subscribe( res => {
      let body = res.json();
      this.comments = body.comments;
      this.setCommentStatus(user_id);
    })
  }

  setCommentStatus(user_id) {
    this.commentsService.setCommentStatus({ user_id: user_id }).subscribe();
  }
}
