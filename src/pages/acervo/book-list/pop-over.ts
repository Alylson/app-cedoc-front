import { Component } from '@angular/core';
import {Events, NavParams} from "ionic-angular";
import {UtilsProvider} from "../../../providers/utils/utils";

@Component({
  selector: 'page-api-radio-popover',
  template: `
    <ion-list radio-group (ionChange)="callSortBooks()" no-lines radio-group [(ngModel)]="sortType">
      <ion-list-header>
        Ordenar por
      </ion-list-header>
      <ion-item>
        <ion-label>Nome</ion-label>
        <ion-radio value="NOME" checked="true"></ion-radio>
        <ion-icon name="bookmark" item-start></ion-icon>
      </ion-item>
      <ion-item>
        <ion-label>Autor</ion-label>
        <ion-radio value="AUTOR"></ion-radio>
        <ion-icon name="person" item-start></ion-icon>
      </ion-item>
      <ion-item>
        <ion-label>Data de publicação</ion-label>
        <ion-radio value="DATA_PUBLI"></ion-radio>
        <ion-icon name="calendar" item-start></ion-icon>
      </ion-item>
      <ion-item>
        <ion-label>Data de postagem</ion-label>
        <ion-radio value="DATA_POST"></ion-radio>
        <ion-icon name="calendar" item-start></ion-icon>
      </ion-item>
      <ion-item>
        <ion-label>Disp. de download</ion-label>
        <ion-radio value="DISP_DOWNLOAD"></ion-radio>
        <ion-icon name="download" item-start></ion-icon>
      </ion-item>
      <ion-item>
        <ion-label>Disp. na biblioteca</ion-label>
        <ion-radio value="DISP_BIBLIOTECA"></ion-radio>
        <ion-icon name="checkmark-circle" item-start></ion-icon>
      </ion-item>
    </ion-list>
  `,
})
export class PopOver {

  sortType:any;

  constructor(public events: Events) {  }

  callSortBooks(){
    UtilsProvider.SORT_TYPE = this.sortType;
    this.events.publish('function:sortBooks', UtilsProvider.SORT_TYPE);
  }

  ngOnInit() {
    this.sortType = UtilsProvider.SORT_TYPE;
  }

}
