import { Component } from '@angular/core';
import {
  Alert, AlertController, Events, IonicPage, LoadingController, MenuController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import {UtilsProvider} from "../../../providers/utils/utils";
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-boletim',
  templateUrl: 'boletim.html',
})
export class BoletimPage {

  boletim:any = '';
  loading:any;
  plt: Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,
              public menu: MenuController, public utils: UtilsProvider, public events: Events,
              public storage: Storage, public loadingCtrl: LoadingController, public plat: Platform,
              private alertCtrl: AlertController) {

    this.plt = plat;

    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();

    api.getNoticias().subscribe( (res) => {
      this.boletim = res;
      this.loading.dismiss();
    });
  }

  abrirDetalhesNoticia(item){
    this.navCtrl.push('NoticiaDetailsPage', {item: item});
  }

  voltar(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BoletimPage');
  }

}
