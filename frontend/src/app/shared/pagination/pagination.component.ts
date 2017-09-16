/**
 * Created by Administrator on 2017/8/21.
 */
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {  Router } from '@angular/router';



@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @Input() activePage: number;
  @Input() lastPage: boolean;
  @Input() user_id: string;
  @Output() onPrevPage = new EventEmitter();
  @Output() onNextPage = new EventEmitter();

  ngOnInit() {

  }

  prevPage() {
    this.onPrevPage.emit();
  }
  nextPage() {
    this.onNextPage.emit();
  }
}
