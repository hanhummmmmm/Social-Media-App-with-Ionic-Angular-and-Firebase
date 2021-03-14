import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { FileUpload } from '../file.upload.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

//For fetching of uid
import {AuthGuard} from './auth.guard'
import { AngularFireAuth } from "@angular/fire/auth";

interface FileItem {
  id: string;
  name: string;
  displayName: string;
  subject: string;
  professor: string;
  year: number;
  url: string;
  datePosted: string;
  timestamp: number;
  uid: string;
  upvotes: number;
  file: File;
};

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  fetchedFiles : FileItem [];
  file : FileItem;
  errorName : string;
  apiURL = 'http://localhost:3000/files'
  fileUpload : FileUpload;
  uid: string;

  constructor(public http:HttpClient, public route:ActivatedRoute, public authguard: AuthGuard, public afAuth: AngularFireAuth) { 
  }

  fetchAllfiles(){
    // Get data from database
    this.http.get<any>(this.apiURL).toPromise().then(data => {
      this.fetchedFiles = data.fetchedFiles;
    }).catch(error =>{
    this.errorName = error.name;
    });
  }
  
  getFilefromRouteId(fileIdFromRoute){
    //Get id from current route
    this.fetchAllfiles();
    this.file = this.fetchedFiles.find(file => file.id === fileIdFromRoute);
    return this.file;
    
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  async fetchAllFilesbyUser(){
    await this.afAuth.currentUser.then(data => {
      this.uid = data.uid;
    })
   
    console.log(this.apiURL + '/profile/' + this.uid);
    this.http.get<any>(this.apiURL + '/profile/' + this.uid).toPromise().then(data => {
      this.fetchedFiles = data.fetchedFiles;
    }).catch(error =>{
    this.errorName = error.name;
    });
  }
  


  
}
