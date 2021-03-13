import { Component, OnInit } from '@angular/core';

import{ AuthGuard } from '../auth.guard'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(public authguard: AuthGuard) { }

  ngOnInit() {
    this.authguard.getCurrentUser();
  }

}
