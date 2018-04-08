import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestcliPage } from './gestcli';

@NgModule({
  declarations: [
    GestcliPage,
  ],
  imports: [
    IonicPageModule.forChild(GestcliPage),
  ],
})
export class GestcliPageModule {}
