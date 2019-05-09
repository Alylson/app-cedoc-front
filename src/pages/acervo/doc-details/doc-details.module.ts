import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocDetailsPage } from './doc-details';

@NgModule({
  declarations: [
    DocDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DocDetailsPage),
  ],
})
export class DocDetailsPageModule {}
