/**
 * Created by Administrator on 2017/9/12.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { NotificationsComponent } from './notifications.component';
import { CommentsComponent } from './comments/index';
import { LikesComponent } from './likes/index';
import { VotesComponent } from  './votes/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    NotificationsComponent,
    CommentsComponent,
    LikesComponent,
    VotesComponent
  ],
  exports: [
    CommentsComponent,
    LikesComponent,
    VotesComponent
  ],
  providers: []
})

export class NotificationsModule {

}
