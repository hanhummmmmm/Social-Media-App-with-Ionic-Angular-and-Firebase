import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import{ AuthGuard } from '../services/auth.guard'
import {FetcherService } from '../services/fetcher.service'

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

  uid;

  constructor(public authguard: AuthGuard,
    public fetcher: FetcherService,
    public afAuth: AuthGuard) { }

  ngOnInit() {
    
   

    this.fetcher.fetchAllFilesbyUser();
  }

}
