import { Component, OnInit } from '@angular/core';

import {FetcherService} from '../fetcher.service'

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})

export class FileComponent implements OnInit {

  constructor(public fetcher: FetcherService) {
   }

  ngOnInit() {
  this.fetcher.fetchAllfiles();
  }

}
