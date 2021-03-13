import { Component, OnInit } from '@angular/core';

import{ AuthGuard } from '../auth.guard'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string = "";
  password: string = "";
  displayname: string = "";
  photourl: string = "";

  constructor(public authguard: AuthGuard) { }

  ngOnInit() {
    this.authguard.getCurrentUser();
  }

}
