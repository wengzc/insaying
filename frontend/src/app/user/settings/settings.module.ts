/**
 * Created by Administrator on 2017/8/18.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { SettingsRoutingModule } from './settings-routing.module'
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { BasicsComponent } from './basics/index';
import { AvatarComponent } from './avatar/index';
import  { PasswordComponent } from './password/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    BasicsComponent,
    AvatarComponent,
    PasswordComponent
  ],
  exports: [
    BasicsComponent,
    AvatarComponent,
    PasswordComponent
  ],
  providers: []
})

export class SettingsModule {

}
