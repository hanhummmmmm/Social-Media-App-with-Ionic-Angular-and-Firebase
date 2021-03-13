import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class AuthGuard {

userState: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
    public alert: AlertController
  ){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

 getCurrentUser(){
  const currentUser = this.afAuth.user
  currentUser.subscribe(data =>{
    console.log("Current user details logged")
    console.log(data)
  })
 }

 async updateCurrentUser(displayname, photourl){
  const currentUser = await this.afAuth.currentUser
   currentUser.updateProfile({
    displayName: displayname,
    photoURL: photourl
  }).then(function() {
    this.showAlert("Success", "Profile details are updated")
  }).catch(function(error) {
    this.showAlert("Error", error.mesaage)
  });
 }

 async declareUserStatus() {
  const user = await this.isLoggedIn()
  if (user) {
    console.log('this user is logged in')
  } else {
    console.log('not signed in')
 }
}

  
  async login(username, password) {
    //const {username, password} = this;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password);
      console.log(res);
      this.showAlert("Welcome back", "You are successfully signed in");
      this.router.navigate(['/tabs']);
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
