import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public Afauth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    const {username, password} = this;
    try {
      const res = await this.Afauth.signInWithEmailAndPassword(username, password);
      console.log("SUCESS")
    } catch(err){
      console.dir(err);
      if (err.code == "auth/user-not-found"){
        console.log("User not found");
      }
    }
  }

}
