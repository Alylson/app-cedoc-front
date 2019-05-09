import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {

  livro:any;
  logged: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private storage: Storage) {
    this.livro = this.navParams.get('item');

    this.storage.get('Logged').then((logg) => {
      if(logg == null) {
        this.logged = false;
      } else {
        this.logged = logg;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }

  alertLogin(){
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Voce precisa logar em uma conta para usar essas funções.',
      buttons: ['Ok']
    });
    alert.present();
  }

}
