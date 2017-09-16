/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { LikesService } from './likes.service';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
  providers: [ LikesService ]
})

export class LikesComponent implements OnInit {

  serverUrl: string = SITE_HOST_URL;
  user_id: string;
  likes: any;

  constructor(
    private userService: UserService,
    private LikesService: LikesService
  ) { }

  ngOnInit() {
    this.userService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.user_id = body.user._id;
      this.getUserReceivedLikes(this.user_id);
    })
  }

  getUserReceivedLikes(user_id) {
    this.LikesService.getUserReceivedLikes(user_id).subscribe( res => {
      let body = res.json();
      this.likes = body.likes;
      this.setLikesStatus(user_id);
    })
  }

  setLikesStatus(user_id) {
    this.LikesService.setLikesStatus({ user_id: user_id }).subscribe();
  }
}
