import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FetcherService } from "../fetcher.service"

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  file;

  constructor(public fetcher: FetcherService,
    public route:ActivatedRoute) {
     }


  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const fileIdFromRoute = routeParams.get("fileId");
    this.file = this.fetcher.getFilefromRouteId(fileIdFromRoute)
    console.log(this.file)
  }

}
