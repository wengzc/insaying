/**
 * Created by Administrator on 2017/8/16.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { UserService } from './services/index'
import { AuthGuard } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [

  ],
  providers: [
    UserService,
    AuthGuard
  ]
})
export class CoreModel {

}
