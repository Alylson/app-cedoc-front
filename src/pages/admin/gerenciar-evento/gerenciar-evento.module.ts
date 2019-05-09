import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarEventoPage } from './gerenciar-evento';

@NgModule({
  declarations: [
    GerenciarEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarEventoPage),
  ],
})
export class GerenciarEventoPageModule {}
