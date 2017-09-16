/**
 * Created by Administrator on 2017/8/2.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ArticleModule } from '../article/article.module';
import { SettingsModule } from './settings/settings.module';
import { HomepageModule } from './homepage/homepage.module';

import { RegisterComponent } from './register/index';
import { LoginComponent } from './login/index';
import { NotificationsModule } from './notifications/notifications.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ArticleModule,
    SharedModule,
    SettingsModule,
    HomepageModule,
    NotificationsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
  ]
})
export class UserModule {
}
