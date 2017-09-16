import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, OnInit{

  isLogin: boolean;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.userService.authGuard().subscribe((res: any) => {
      let body = res.json();
      this.isLogin = body.isLogin;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if(this.userService.isLogin) {
        return true;
      } else {
        if(this.userService.isLogin === undefined) {
          return Boolean(
              this.userService.authGuard().subscribe((res: any) => {
                let body = res.json();
                this.isLogin = body.isLogin;
                if(!this.isLogin) {
                  this.router.navigate(['/user/login'], {queryParams:{returnUrl: state.url}});
                  return false;
                } else {
                  return true;
                }
              })
          )
        } else {
          this.router.navigate(['/user/login'], {queryParams:{returnUrl: state.url}});
          return false;
        }
      }
  }
}
