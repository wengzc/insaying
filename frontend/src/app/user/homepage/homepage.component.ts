import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { HomepageService } from  './homepage.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit{

  user: any;
  user_id: string;
  userReceivedlikesCount: number;
  userlikesCount: number;
  userArticlesCount: number;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private homepageService: HomepageService,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( (params:Params) => {
      this.user_id = '';
      this.user_id = params['id'];
      this.getUser(this.user_id);
      this.getUserReceivedLikesCount(this.user_id);
      this.getUserLikesCount(this.user_id);
      this.getUserArticlesCount(this.user_id);
    })
  }

  getUser(user_id) {
    this.homepageService.getUser(user_id).subscribe( user => {
      let body = user.json();
      this.user = body.user;
    })
  }

  getUserReceivedLikesCount(user_id) {
    this.homepageService.getUserReceivedLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userReceivedlikesCount = body.receivedlikesCount;
    })
  }

  getUserLikesCount(user_id) {
    this.homepageService.getUserLikesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userlikesCount = body.userlikesCount;
    })
  }

  getUserArticlesCount(user_id) {
    this.homepageService.getUserArticlesCount(user_id).subscribe( res => {
      let body = res.json();
      this.userArticlesCount = body.userArticlesCount;
    })
  }

}
