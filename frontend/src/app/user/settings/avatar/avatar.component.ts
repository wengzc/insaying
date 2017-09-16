/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { AvatarService } from './avatar.service';
import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  providers: [ AvatarService ]
})
export class AvatarComponent implements OnInit {

  constructor(
    private avatarService: AvatarService,
    public userService: UserService,
  ) { }

  serverUrl: string = SITE_HOST_URL;
  user: any;
  user_id: string;
  avatarErrorMsg: string;
  msg: string;

  ngOnInit() { }

  uploadAvatar(data) {
        if(!this.uploadCheck(data)){
          return ;
        } else {
          this.avatarService.uploadAvatar(data).subscribe( res => {
            let body = res.json();
            this.msg = body.message;
            this.userService.getUser();
            setTimeout(() =>{
              this.msg = '';
            }, 3000)
          })
        }
  }

  uploadCheck(data) {
    if(!data) {
      this.avatarErrorMsg = '您还没有选择图片,无法上传!';
      return false;
    }
    if(data.size && data.size > 1200000) {
      this.avatarErrorMsg = '图片大小过大,需上传小于1MB的图片!';
      return false;
    }
    if(!data.type.startsWith('image')) {
      this.avatarErrorMsg = '图片类型不符合要求,需上传jpg,jpeg,png等格式图片!';
      return false;
    }
    return true;
  }

  valueChange(){
    this.avatarErrorMsg = '';
    this.msg = '';
  }

}
