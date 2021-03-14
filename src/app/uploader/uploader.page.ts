import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {UploaderService} from "../services/uploader.service"
import {FileUpload} from "../file.upload.model"

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  filename: string;
  subject: string;
  professor: string;
  year: number;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(public http: HttpClient,
    public uploader: UploaderService,
    ) { }

  ngOnInit() {
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploader.pushFileToStorage(this.currentFileUpload,this.subject, this.year).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }


  }

 


