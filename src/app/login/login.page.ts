import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import{ AuthGuard } from '../auth.guard'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertController,
    public authguard: AuthGuard) { }

  ngOnInit() {
    this.authguard.declareUserStatus();
  }


}
