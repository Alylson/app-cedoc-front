import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOver } from './pop-over';

@NgModule({
  declarations: [
    PopOver,
  ],
  imports: [
    IonicPageModule.forChild(PopOver),
  ]
})
export class PopOverModule {}
