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

  getFilefromRouteId(){
    //Get id from current route
    const routeParams = this.route.snapshot.paramMap;
    const fileIdFromRoute = String(routeParams.get("fileId"));
  }

  
}
