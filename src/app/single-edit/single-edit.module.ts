import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleEditPageRoutingModule } from './single-edit-routing.module';

import { SingleEditPage } from './single-edit.page';
import { MaterialModule } from '../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleEditPageRoutingModule,
    MaterialModule
  ],
  declarations: [SingleEditPage]
})
export class SingleEditPageModule {}
