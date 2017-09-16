/**
 * Created by Administrator on 2017/8/9.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ArticleWriteComponent } from './article-write/index';
import { ArticleEditComponent } from './article-edit/index';
import { ArticleContentComponent } from './article-content/index';
import { AuthGuard } from '../core/services/auth-guard.service';

export const articleRoutes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'write', component: ArticleWriteComponent, canActivate: [AuthGuard]
  },
  {
    path: ':id', component: ArticleContentComponent
  },
  {
    path: ':id/edit', component: ArticleEditComponent, canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModel {

}
