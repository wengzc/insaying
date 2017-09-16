/**
 * Created by Administrator on 2017/8/2.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { RegisterComponent } from './register/index';
import { HomepageComponent } from './homepage/index';
import { LoginComponent } from './login/index';
import { SettingsComponent } from './settings/index';
import { NotificationsComponent } from './notifications/index';

import { BasicsComponent } from './settings/basics/index';
import { AvatarComponent } from './settings/avatar/index';
import  { PasswordComponent } from './settings/password/index';
import { UserArticleListComponent } from './homepage/user-article-list/index';
import { UserBasicsComponent } from './homepage/user-basics/index';
import { UserReplyComponent } from './homepage/user-reply/index';
import { UserlikeComponent } from './homepage/user-like/index';
import { CommentsComponent } from './notifications/comments/index';
import { LikesComponent } from  './notifications/likes/index';
import { VotesComponent } from  './notifications/votes/index';


import { AuthGuard } from '../core/services/auth-guard.service';

export const userRoutes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'notifications', component: NotificationsComponent,
    children: [
      { path: "comments", component: CommentsComponent },
      { path: 'likes', component: LikesComponent },
      { path: 'votes', component: VotesComponent }
    ]
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'basics', component: BasicsComponent  },
      { path: 'avatar', component: AvatarComponent },
      { path: 'password', component: PasswordComponent }
    ]
  },
  {
    path: ':id', component: HomepageComponent,
    children: [
      { path: 'article', component: UserArticleListComponent },
      { path: 'reply', component: UserReplyComponent },
      { path: 'like', component: UserlikeComponent },
      { path: 'basics', component: UserBasicsComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
