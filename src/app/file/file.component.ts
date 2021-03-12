import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

import { HttpClient } from '@angular/common/http';

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



@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})

export class FileComponent implements OnInit {

  fetchedFiles : File [];

  apiURL = 'http://localhost:3000/files'

  constructor(public http: HttpClient, private route: ActivatedRoute,) {
   }

  ngOnInit() {
    // Get data from database
    this.http.get<any>(this.apiURL).toPromise().then(data => {
      this.fetchedFiles = data.fetchedFiles;
    }).catch(error =>{
      console.log(error);
    });

    //Get id from current route
    const routeParams = this.route.snapshot.paramMap;
    const fileIdFromRoute = String(routeParams.get("fileId"));

    //Find file that corresponds to this ID
    

    //Using this method means that file is fetched based on whole array
    // which means if you do implement infinite scroll you have to push
    // and potentially refresh this method.
  }

}
