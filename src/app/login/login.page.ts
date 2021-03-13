import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public Afauth: AngularFireAuth,
    public router: Router,
    public alert: AlertController) { }

  ngOnInit() {
  }

  async login() {
    const {username, password} = this;
    try {
      const res = await this.Afauth.signInWithEmailAndPassword(username, password);
      console.log(res);
      this.showAlert("Welcome back", "You are successfully signed in");
      this.router.navigate(['/feed']);
    } catch(err){
      console.dir(err);
      if (err.code == "auth/user-not-found"){
        err.message = "No account made yet. Register first."
        this.showAlert("Error", err.message)
      }
      console.error(err);
      this.showAlert("Error", err.message)
    }
  }

  async showAlert(header:string, message:string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Okay"]
    })
    await alert.present()
  }

}
