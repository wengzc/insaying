/**
 * Created by Administrator on 2017/8/11.
 */
import { Component, OnInit, Input} from '@angular/core';


import { SITE_HOST_URL } from '../config/index';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticlelistComponent implements OnInit {

  constructor(

  ) { }

  @Input() articlelist: any;
  serverUrl: string = SITE_HOST_URL;

  ngOnInit() {

  }

}
