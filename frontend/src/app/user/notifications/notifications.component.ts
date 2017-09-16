/**
 * Created by Administrator on 2017/9/12.
 */
import { Component, OnInit } from '@angular/core';

import { NotificationsService } from './notifications.service'
import { UserService } from '../../core/services/index';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ NotificationsService ]
})

export class NotificationsComponent implements OnInit {

  user_id: string;
  newCommentsCount: number;
  newLikesCount: number;
  newVotesCount: number;
  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService
  ) { }
  ngOnInit() {
    this.userService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.user_id = body.user._id;
      if(this.user_id) {
        this.getUserNewReceivedCommentsCount(this.user_id);
        this.getUserNewReceivedLikesCount(this.user_id);
        this.getUserNewReceivedVotesCount(this.user_id);
      }
    })
  }

  getUserNewReceivedCommentsCount(user_id: string) {
    this.notificationsService.getUserNewReceivedCommentsCount(user_id).subscribe( res => {
      let body = res.json();
      this.newCommentsCount = body.commentsCount;
    })
  }

  getUserNewReceivedLikesCount(user_id: string) {
    this.notificationsService.getUserNewReceivedLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.newLikesCount = body.likesCount;
    })
  }

  getUserNewReceivedVotesCount(user_id: string) {
    this.notificationsService.getUserNewReceivedVotesCount(user_id).subscribe( res => {
      let body = res.json();
      this.newVotesCount = body.votesCount;
    })
  }
  reload() {
    this.getUserNewReceivedCommentsCount(this.user_id);
    this.getUserNewReceivedLikesCount(this.user_id);
    this.getUserNewReceivedVotesCount(this.user_id);
  }
  // reloadNewCommentsCount() {
  //   this.getUserNewReceivedCommentsCount(this.user_id);
  // }
  // reloadNewLikesCount() {
  //
  // }
}
