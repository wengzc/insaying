/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';

import { UserBasicsService } from './user-basics.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-basics',
  templateUrl: './user-basics.component.html',
  styleUrls: ['./user-basics.component.css'],
  providers: [ UserBasicsService ]
})
export class UserBasicsComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private useerbasicsService: UserBasicsService,
  ) { }

  user: any;
  user_id: string;

  ngOnInit() {
    this.user_id = this._activatedRoute.parent.snapshot.params['id'];
    this.getUser(this.user_id);
  }

  getUser(user_id) {
    this.useerbasicsService.getUser(user_id).subscribe( user => {
      let body = user.json();
      this.user = body.user;
    })
  }

}
