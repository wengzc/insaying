/**
 * Created by Administrator on 2017/8/2.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeComponent } from './home/index';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'article/page/:index', component: HomeComponent
  },
  {
    path: 'user', loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'article', loadChildren: './article/article.module#ArticleModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash:true,
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
