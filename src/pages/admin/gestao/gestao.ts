import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UtilsProvider} from "../../../providers/utils/utils";

/**
 * Generated class for the GestaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestao',
  templateUrl: 'gestao.html',
})
export class GestaoPage {

  plt: Platform;
  inactiveUsers: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plat: Platform,
              public storage: Storage, public utils: UtilsProvider) {
    this.plt = plat;
    //this.inactiveUsers = this.navParams.get('inactiveUsers');
    this.storage.get('inactiveUsers').then((inactiveUsers) => {
      this.inactiveUsers = inactiveUsers;
    });
  }

  voltar() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {  }

  ionViewWillEnter() {
    this.storage.get('inactiveUsers').then((inactiveUsers) => {
      this.inactiveUsers = inactiveUsers;
    });
  }

  gerenciar(position) {
    this.navCtrl.push('GerenciarListPage', {position: position});
  }

  gerenciarEvento() {
    //TODO
    //this.navCtrl.push('GerenciarEventoPage');
  }

  cadastrarEvento() {
    this.navCtrl.push('CadastrarEventoPage');
  }

}
