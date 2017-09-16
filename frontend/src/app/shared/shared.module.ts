/**
 * Created by Administrator on 2017/8/7.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent} from './navbar/index';
import { ArticlelistComponent } from './article-list/index';
import { SidebarComponent } from './sidebar/index';
import { AuthorSidebarComponent } from './author-sidebar/index';
import { PaginationComponent } from './pagination/index';
import { FooterComponent } from './footer/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    AuthorSidebarComponent,
    ArticlelistComponent,
    PaginationComponent,
    FooterComponent
  ],
  providers: [ ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ArticlelistComponent,
    AuthorSidebarComponent,
    PaginationComponent,
    FooterComponent
  ]
})export class SharedModule {

}

