/**
 * Created by Administrator on 2017/8/30.
 */
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'other-articles',
  templateUrl: './other-articles.component.html',
  styleUrls: ['./other-articles.component.css'],
})
export class OtherArticlesComponent implements OnInit {

  @Input() otherArticles: any;
  constructor(private router: Router) { }

  ngOnInit() { }

}
