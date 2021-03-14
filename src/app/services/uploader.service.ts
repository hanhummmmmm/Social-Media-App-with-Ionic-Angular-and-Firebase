import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthGuard} from './auth.guard'

import { AlertController } from '@ionic/angular';


// Import Database and Storage from Firebase
import { AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

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
 
  
  constructor(public http: HttpClient,
    public authguard: AuthGuard,
    public alert: AlertController,
    private db: AngularFirestore, 
    private storage: AngularFireStorage
    ) { }


    pushFileToStorage(fileUpload: FileUpload, subject, year): Observable<number> {
      const filePath = `${this.basePath}/${fileUpload.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.fileSubmitted(fileUpload, subject, year);
          });
        })
      ).subscribe();
  
      return uploadTask.percentageChanges();
    }

    private saveFileData(fileUpload: FileUpload): void {
      console.log(fileUpload)
    }
    

    // Called when user clicks "Choose File" and saves file
  fileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }


  serializeForm(formData){
    formData.entries();
    for (const [key, value]  of formData) {
      this.data[key] = value;
    }
    return this.data;
    }
  

  fileSubmitted(fileUpload: FileUpload, subject, year){
    this.uid = this.authguard.getUserId(); //why is this void
    this.data = {
      'name': fileUpload.name,
      'subject': subject,
      'year': year,
      'url': fileUpload.url,
      'uid': this.uid
    }
    //convert to JSON
    // this.data = this.serializeForm(formData)
    // console.log(this.data)
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
