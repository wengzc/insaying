/**
 * Created by Administrator on 2017/8/1.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/delay';

import { RegisterService } from './register.service';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent {

  constructor (
    private registerService: RegisterService,
    private router: Router,
    private userService: UserService
  ) { }

  registerResult = false;
  alert:any = {msg: ''};
  username: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  errorMsg1: string = '';
  errorMsg2: string = '';

  register() {
    if (!this.registerCheck()) {
      return ;
    }
    this.registerService
      .addUser({
        username: this.username,
        password: this.newPassword
      }).subscribe((res: any) => {
      let body = res.json();
      this.registerResult = true;
      this.userService.isLogin = body.isLogin;
      this.userService.userInfo = body.user;
      this.alert.msg = body.message; //注册操作提示信息
      new Observable(observer => {
        observer.next();
      }).delay(2000).subscribe(data => {
        if(body.isLogin) {
          this.router.navigate(['/']); // 跳到首页
        }
      });
    }, (error: any) => {
      console.error(error);
    })
  }
  valueChange(){
    this.errorMsg1 = '';
    this.errorMsg2 = '';
    this.alert.msg = '';
  }
  registerCheck() {
    if (!this.username || this.username.length < 3 || this.username.length > 10) {
      this.errorMsg1 = '用户名无效,应为3-10个字符!';
      return false;
    }
    if (!this.newPassword || this.newPassword.length < 6 || this.newPassword.length > 18 ) {
      this.errorMsg2 = '密码过短或过长,应为6-18个字符!';
      return false;
    }
    if (this.newPassword !== this.repeatPassword) {
      this.errorMsg2 = '两次密码不一样,请重新检查输入!!';
      return false;
    }
    return true;
  }

}
