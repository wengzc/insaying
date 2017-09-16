/**
 * Created by Administrator on 2017/8/16.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/index';
import { SidebarService } from './sidebar.service';
import { SITE_HOST_URL } from '../config/index';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ SidebarService ]
})
export class SidebarComponent implements OnInit {

  user_id: string;
  userReceivedlikesCount: number;
  userlikesCount: number;
  userArticlesCount: number;

  constructor(
    private sidebarService: SidebarService,
    public userService: UserService,
  ) { }

  serverUrl: string = SITE_HOST_URL;
  ngOnInit() {
    this.sidebarService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.user_id = body.user._id;
      if(this.user_id) {
        this.getUserReceivedLikesCount(this.user_id);
        this.getUserLikesCount(this.user_id);
        this.getUserArticlesCount(this.user_id);
      }
    })
  }
  getUserArticlesCount(user_id) {
    this.sidebarService.getUserArticlesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userArticlesCount = body.userArticlesCount;
    })
  }

  getUserLikesCount(user_id) {
    this.sidebarService.getUserLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userlikesCount = body.userlikesCount;
    })
  }

  getUserReceivedLikesCount(user_id) {
    this.sidebarService.getUserReceivedLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userReceivedlikesCount = body.receivedlikesCount;
    })
  }

}
