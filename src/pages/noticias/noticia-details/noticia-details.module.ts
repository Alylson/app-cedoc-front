import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiaDetailsPage } from './noticia-details';

@NgModule({
  declarations: [
    NoticiaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiaDetailsPage),
  ],
})
export class NoticiaDetailsPageModule {}
