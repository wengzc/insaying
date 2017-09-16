/**
 * Created by Administrator on 2017/9/12.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from '../../core/services/auth-guard.service';

import { SettingsComponent } from './settings.component';
import { BasicsComponent } from './basics/index';
import { AvatarComponent } from './avatar/index';
import  { PasswordComponent } from './password/index';

export const settingsRoutes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
        { path: 'basics', component: BasicsComponent  },
        { path: 'avatar', component: AvatarComponent },
        { path: 'password', component: PasswordComponent }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
