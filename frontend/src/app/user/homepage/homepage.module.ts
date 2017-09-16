/**
 * Created by Administrator on 2017/8/22.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { HomepageComponent } from './homepage.component';
import { UserArticleListComponent } from './user-article-list/index';
import { UserBasicsComponent } from './user-basics/index';
import { UserReplyComponent } from './user-reply/index';
import { UserlikeComponent } from './user-like/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    HomepageComponent,
    UserArticleListComponent,
    UserBasicsComponent,
    UserReplyComponent,
    UserlikeComponent
  ],
  exports: [
    UserArticleListComponent,
    UserBasicsComponent,
    UserReplyComponent,
    UserlikeComponent
  ],
  providers: [ ]
})

export class HomepageModule {

}
