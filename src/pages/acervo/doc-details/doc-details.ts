import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UtilsProvider} from "../../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-doc-details',
  templateUrl: 'doc-details.html',
})
export class DocDetailsPage {

  doc: any;
  tipo: string;
  logged: boolean;

  public plt: Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private storage: Storage, private plat: Platform, public utils: UtilsProvider) {

    this.plt = plat;

    this.doc = this.navParams.get('item');
    this.tipo = this.navParams.get('tipo');

    this.storage.get('Logged').then((logg) => {
      if(logg == null) {
        this.logged = false;
      } else {
        this.logged = logg;
      }
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BookDetailsPage');
  }

  voltar(){
    this.navCtrl.pop();
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
