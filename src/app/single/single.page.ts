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
    this.file.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus augue sem, ut finibus tortor tempor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et enim ut ligula maximus rutrum sed eu dolor. "
  }

}
