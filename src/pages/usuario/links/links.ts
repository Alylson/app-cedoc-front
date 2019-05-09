import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {

  plt: Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plat: Platform) {
    this.plt = plat;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinksPage');
  }

}
