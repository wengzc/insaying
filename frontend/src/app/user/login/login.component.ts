/**
 * Created by Administrator on 2017/8/2.
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/delay';

import { LoginService} from '../login/login.service';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMsg1: string = '';
  errorMsg2: string = '';
  loginResult: boolean = false;
  alert: any = { msg: ''};
  returnUrl: string ='';

  constructor(
    private activeRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }


  login() {
    if(!this.loginCheck()) {
      return ;
    }
    this.loginService.login({
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      let body = res.json();
      this.loginResult = true;
      this.alert.msg = body.message;
      this.userService.isLogin = body.isLogin;
      this.userService.userInfo = body.user;
      new Observable( observer => {
        observer.next();
      }).delay(2000).subscribe(data => {
        if(body.isLogin) {
          if(this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.location.back();
          }
          // this.router.navigate([this.returnUrl?this.returnUrl:'/']);
        }
      });
    })
  }

  loginCheck() {
    if(!this.username) {
      this.errorMsg1 = '用户名不能为空,请检查并输入!'
      return false;
    }
    if(!this.password) {
      this.errorMsg2 = '密码不能为空,请检查并输入!'
      return false;
    }
    return true;
  }

  valueChange(){
    this.errorMsg1 = '';
    this.errorMsg2 = '';
    this.alert.msg = '';
  }

}
