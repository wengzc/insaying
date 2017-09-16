/**
 * Created by Administrator on 2017/8/7.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';


import { ArticleRoutingModel } from './article-routing.model'
import { SharedModule } from '../shared/shared.module';

import { MdEditorComponent } from './shared/md-editor/index';
import { ArticleWriteComponent } from './article-write/index';
import { ArticleEditComponent } from './article-edit/index';
import { ArticleContentComponent } from './article-content/index';
import { CommentListComponent } from './article-content/comment-list/index';
import { OtherArticlesComponent } from './article-content/other-articles/index'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ArticleRoutingModel,
    SharedModule
  ],
  declarations: [
    ArticleWriteComponent,
    ArticleEditComponent,
    MdEditorComponent,
    ArticleContentComponent,
    OtherArticlesComponent,
    CommentListComponent
  ],
  providers: [],
  exports: [ OtherArticlesComponent ]
})
export class ArticleModule {

}
