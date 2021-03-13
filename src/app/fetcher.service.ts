import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";




interface File {
  id: string;
  name: string;
  subject: string;
  professor: string;
  year: number;
  url: string;
  datePosted: string;
  user: string;
  upvotes: number;
};


@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  fetchedFiles : File [];
  file : File;
  errorName : string;

  apiURL = 'http://localhost:3000/files'

  constructor(public http:HttpClient, public route:ActivatedRoute) { 
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

  
}
