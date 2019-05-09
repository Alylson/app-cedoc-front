import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocListPage } from './doc-list';

@NgModule({
  declarations: [
    DocListPage,
  ],
  imports: [
    IonicPageModule.forChild(DocListPage),
  ],
})
export class DocListPageModule {}
