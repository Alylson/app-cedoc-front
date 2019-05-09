import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarListPage } from './gerenciar-list';

@NgModule({
  declarations: [
    GerenciarListPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarListPage),
  ],
})
export class GerenciarListPageModule {}
