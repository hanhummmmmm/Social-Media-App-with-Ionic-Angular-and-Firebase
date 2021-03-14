import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { FetcherService } from "../services/fetcher.service"
import { UploaderService} from '../services/uploader.service'

@Component({
  selector: 'app-single-edit',
  templateUrl: './single-edit.page.html',
  styleUrls: ['./single-edit.page.scss'],
})
export class SingleEditPage implements OnInit {
  file;
  filename: string;
  subject: string;
  professor: string;
  year: number;
  description: string;

  constructor(public fetcher: FetcherService,
    public route:ActivatedRoute,
    public uploader: UploaderService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const fileIdFromRoute = routeParams.get("fileId");
    this.file = this.fetcher.getFilefromRouteId(fileIdFromRoute)
    this.file.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus augue sem, ut finibus tortor tempor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et enim ut ligula maximus rutrum sed eu dolor. "
  }

}
