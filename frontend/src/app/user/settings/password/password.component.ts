/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { PasswordService } from './password.service';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [PasswordService]
})
export class PasswordComponent implements OnInit {

  constructor(
    private userService: UserService,
    private passwordService: PasswordService
  ) { }
  originalPassword: string;
  newPassword: string;
  repeatPassword: string;
  originalPasswordMsg: string;
  newPasswordMsg: string;
  errorMsg: string;
  successMsg: string;
  changeResult: boolean;
  user: any;
  user_id: string;

  ngOnInit() {

  }

  changePassword() {
    if(!this.passwordCheck()) {
      return ;
    } else {
      this.passwordService.changePassword({
        originalPassword: this.originalPassword,
        newPassword: this.newPassword
      }).subscribe( res => {
        let body = res.json();
        this.changeResult = body.changeResult;
        if(!this.changeResult) {
          this.errorMsg = body.errorMsg;
        } else  {
          this.successMsg = body.successMsg;
          setTimeout(() =>{
            this.successMsg = '';
          }, 3000)
        }
        this.userService.getUser();
      })
    }
  }

  passwordCheck() {
    if(!this.originalPassword) {
      this.originalPasswordMsg = '原密码不能为空,请检查并输入原密码!';
    }
    if(!this.newPassword) {
      this.newPasswordMsg = '新密码不能为空,请检查并输入新密码!';
    }
    if (this.newPassword.length < 6 || this.newPassword.length > 18 ) {
      this.newPasswordMsg = '新密码过短或过长,应为6-18个字符!';
      return false;
    }
    if (this.newPassword !== this.repeatPassword) {
      this.newPasswordMsg = '两次新密码不一样,请检查并重新输入!';
      return false;
    }
    return true;
  }

  valueChange(){
    this.originalPasswordMsg = '';
    this.newPasswordMsg = '';
    this.errorMsg = '';
    this.successMsg = '';
  }
}
