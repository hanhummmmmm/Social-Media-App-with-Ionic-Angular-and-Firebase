import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  


  constructor(public Afauth:AngularFireAuth,
    private alert: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  async register(){
    const {username, password, cpassword} = this;
    if (password != cpassword){
      this.showAlert("Error", "Password do not match.")
      return console.error("Passwords don't match") //this works so we can write naman sa console
    }
    try{
      const res = await this.Afauth.createUserWithEmailAndPassword(username, password);
      console.log(res);
      this.showAlert("Welcome!", "Your account was succesfully created.");
      this.router.navigate(['/tabs']);
    }catch(error){
      console.error(error);
      this.showAlert("Error", error.message)
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
