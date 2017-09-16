/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
/**
 * Created by Administrator on 2017/9/12.
 */
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/index';
import { VotesService } from './votes.service';

import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  providers: [ VotesService ]
})

export class VotesComponent implements OnInit {

  serverUrl: string = SITE_HOST_URL;
  user_id: string;
  votes: any;

  constructor(
    private userService: UserService,
    private votesService: VotesService
  ) { }

  ngOnInit() {
    this.userService.getUserWithoutSubscribe().subscribe( res => {
      let body = res.json();
      this.user_id = body.user._id;
      this.getUserReceivedVotes(this.user_id);
    })
  }

  getUserReceivedVotes(user_id) {
    this.votesService.getUserReceivedVotes(user_id).subscribe( res => {
      let body = res.json();
      this.votes = body.votes;
      this.setVotesStatus(user_id);
    })
  }

  setVotesStatus(user_id) {
    this.votesService.setVotesStatus({ user_id: user_id }).subscribe();
  }
}
