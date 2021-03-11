import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  fileChanged(event){
    const files = event.target.files;
    
    const data = new FormData();
    data.append('UPLOADCARE_PUB_KEY', 'e1296bd738303f9bcc7e');
    data.append('UPLOADCARE_STORE', '1')
    data.append('file', files[0])


    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event);
    });
  }

}
