/**
 * Created by Administrator on 2017/8/16.
 */
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../core/services/index';
import { SITE_HOST_URL } from '../config/index';

@Component({
  selector: 'author-sidebar',
  templateUrl: './author-sidebar.component.html',
  styleUrls: ['./author-sidebar.component.css'],
})
export class AuthorSidebarComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public userService: UserService,
  ) {
  }

  serverUrl: string = SITE_HOST_URL;
  _id: string;
  @Input() author: any;
  @Input() articlesCount: number;
  @Input() likesCount: number;
  @Input() receivedlikesCount: number;

  ngOnInit() {
    this._activatedRoute.params.subscribe( (params: Params) => {
      this._id = '';
      this._id = params['id'];
    });
  }
}
