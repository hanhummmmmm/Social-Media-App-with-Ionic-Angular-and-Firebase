import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthGuard} from './auth.guard'

import { AlertController } from '@ionic/angular';

// Import Database and Storage from Firebase
import { AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../file.upload.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private basePath = '';
  selectedFile: File = null;
  uid;
  apiURL = 'http://localhost:3000/files'
  data;
  timestamp;
  datePosted: string;

  
 
  
  constructor(public http: HttpClient,
    public authguard: AuthGuard,
    public alert: AlertController,
    public db: AngularFirestore, 
    private storage: AngularFireStorage,
    public afAuth: AngularFireAuth
    ) { }


    

// add uid, date posted
    pushFileToStorage(fileUpload: FileUpload, filename, subject, year): Observable<number> {
      const filePath = `${this.basePath}/${fileUpload.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.fileSubmitted(fileUpload, filename, subject, year);
          });
        })
      ).subscribe();
  
      return uploadTask.percentageChanges();
    }
    
  async fileSubmitted(fileUpload: FileUpload, filename, subject, year){
    await this.afAuth.currentUser.then(data => {
      this.uid = data.uid;
    });
      this.timestamp = new Date();
      this.datePosted = new Date().toLocaleString()
      this.data = {
        'name': fileUpload.name,
        'displayName': filename,
        'subject': subject,
        'year': year,
        'url': fileUpload.url,
        'uid': this.uid,
        'timestamp': -Math.abs(this.timestamp),
        'datePosted': this.datePosted
        }
    this.http.post(this.apiURL, this.data).subscribe(res => {
      console.log(res)
      this.showAlert("Success", "Your file has been succesfully added")
    })
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
