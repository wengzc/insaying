/**
 * Created by Administrator on 2017/8/18.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/index';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  user: any;
  user_id: string;

  ngOnInit() {
  }

}
