import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UtilsProvider} from "../../../providers/utils/utils";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-noticia-details',
  templateUrl: 'noticia-details.html',
})
export class NoticiaDetailsPage {

  noticia:any;
  logged:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider,
              private alertCtrl: AlertController, private storage: Storage) {
    this.noticia = this.navParams.get('item');

    this.storage.get('Logged').then((logg) => {
      if(logg == null) {
        this.logged = false;

      } else {
        this.logged = logg;
      }
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NoticiaDetailsPage');
  }

}
