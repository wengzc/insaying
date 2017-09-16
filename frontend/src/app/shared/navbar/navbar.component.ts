/**
 * Created by Administrator on 2017/8/6.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/index';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ NavbarService ]
})
export class NavbarComponent implements OnInit {

  @Input() user: any;
  user_id: string;
  selectedLink: any;
  newCommentsCount: number;
  newLikesCount: number;
  newVotesCount: number;

  constructor(
    public userService: UserService,
    private router: Router,
    private navbarService: NavbarService
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

  signout() {
    let user = {
      _id: "",
      name: "",
      password: '',
      salt: '',
      avatar: '',
      created_at: ''
  };
    this.userService.signout().subscribe();
    this.userService.isLogin = false;
    this.userService.userInfo = user;
  }

  selectLink(selected) {
    this.selectedLink = selected;
  }

  getUserNewReceivedCommentsCount(user_id: string) {
    this.navbarService.getUserNewReceivedCommentsCount(user_id).subscribe( res => {
      let body = res.json();
      this.newCommentsCount = body.commentsCount;
    })
  }

  getUserNewReceivedLikesCount(user_id: string) {
    this.navbarService.getUserNewReceivedLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.newLikesCount = body.likesCount;
    })
  }

  getUserNewReceivedVotesCount(user_id: string) {
    this.navbarService.getUserNewReceivedVotesCount(user_id).subscribe( res => {
      let body = res.json();
      this.newVotesCount = body.votesCount;
    })
  }

}
