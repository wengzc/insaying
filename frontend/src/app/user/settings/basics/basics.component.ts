/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { BasicsService } from './basics.service';

@Component({
  selector: 'basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css'],
  providers: [ BasicsService ]
})
export class BasicsComponent implements OnInit {

  constructor(
    public userService: UserService,
    private basicsService: BasicsService
  ) { }

  bio: string;
  github: string
  website: string;
  email: string;
  bioErrorMsg: string;
  emailErrorMsg: string;
  saveResult: boolean;
  alert: any = {msg: ''};


  ngOnInit() {
    this.userService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.bio = body.user.bio;
      this.email = body.user.email;
      this.website = body.user.website;
      this.github = body.user.github;
    });
  }

  changeBasics() {
    if(!this.check()) {
      return ;
    } else {
      this.basicsService.changeBasics({
        bio: this.bio,
        email: this.email,
        website: this.website,
        github: this.github
      }).subscribe( res => {
        let body = res.json();
        this.saveResult = true;
        this.userService.getUser();
        this.alert.msg = body.message;
        setTimeout(() =>{
          this.alert.msg = '';
        }, 3000)
      })
    }
  }

  check() {
    if(this.bio.length > 30) {
      this.bioErrorMsg = "个性签名长度不规范,应在30字内!"
      return false;
    }
    // if(!/^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+com$/.test(this.email)) {
    //   return false;
    // }
    return true;
  }

  valueChange(){
    this.bioErrorMsg = '';
    this.emailErrorMsg = '';
    this.alert.msg = '';
  }

}
