import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverDoc } from './pop-over-doc';

@NgModule({
  declarations: [
    PopOverDoc,
  ],
  imports: [
    IonicPageModule.forChild(PopOverDoc),
  ]
})
export class PopOverDocModule {}
