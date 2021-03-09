import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  


  constructor(public Afauth:AngularFireAuth) { }

  ngOnInit() {
  }

  async register(){
    const {username, password, cpassword} = this;
    if (password != cpassword){
      return console.error("Passwords don't match") //this works so we can write naman sa console
    }

    try{
      const res = await this.Afauth.createUserWithEmailAndPassword(username, password);
      console.log("success")
      console.log(res);
    }catch(error){
      console.error(error);
    }

  }

}
