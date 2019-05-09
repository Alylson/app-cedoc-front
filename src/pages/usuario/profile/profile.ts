import { Component } from '@angular/core';
import {App, Events, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider } from "../../../providers/api/api";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  loading:any;
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public api: ApiProvider, public storage: Storage, public appCtrl: App,
              public menu: MenuController, public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();

    this.api.getUserInfo().then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){
            this.user = res.body.user;
            document.getElementById('nomeUsu').innerHTML = this.user.c_nome;
            this.loading.dismiss();
          }
        }, (res:any) => {
          if (res.status == 401){
            this.logout();
          }
          this.loading.dismiss();
        }
      );
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(true, 'homeMenu');
  }

  logout(){
    this.api.logout();;
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

}
