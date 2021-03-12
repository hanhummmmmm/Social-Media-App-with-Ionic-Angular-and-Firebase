import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileComponent } from '../file/file.component'

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';

import { MaterialModule } from '../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    MaterialModule
  ],
  declarations: [FeedPage, FileComponent],
  exports: [FileComponent]
})
export class FeedPageModule {}
