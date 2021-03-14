import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import{ AuthGuard } from '../services/auth.guard'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
 uid: string;
  constructor(public authguard: AuthGuard, public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    // await this.afAuth.currentUser.then(data => {
    //   this.uid = data.uid;
    //   console.log(this.uid);
    // })
    // console.log(this.uid);
  }

  ngAfterViewInit(){
    // console.log(this.uid);
  }

  
}
