import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestaoPage } from './gestao';

@NgModule({
  declarations: [
    GestaoPage,
  ],
  imports: [
    IonicPageModule.forChild(GestaoPage),
  ],
})
export class GestaoPageModule {}
