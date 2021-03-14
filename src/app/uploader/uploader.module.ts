import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploaderPageRoutingModule } from './uploader-routing.module';

import { UploaderPage } from './uploader.page';

import { MaterialModule } from '../material-module';

// import { AngularFireStorageModule } from 'angularfire2/storage'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploaderPageRoutingModule,
    MaterialModule,
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}
