import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  email: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public events: Events, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    //this.storage.get("Logged").then((logged) => {
    //if(logged) this.navCtrl.setRoot(NavPage);
    //});
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 5000
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

  login() {
    this.navCtrl.popToRoot();
  }

  recuperarSenha() {

    if (!this.validateEmail(this.email)) {
      this.presentToast('Digite seu email no formato nome@email.com');
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Enviando'
    });
    loading.present();

    this.api.recuperarSenha(this.email).subscribe((res: any) => {
      if (res.status == 201 || res.status == 200) {
        this.navCtrl.push(LoginPage, {recovery: true})
      }
      loading.dismiss();
    }, (res) => {
      if (res.status == 403) {
        this.presentToast(res.error[0].Erro);
      } else if (res.status == 401) {
        this.presentToast(res.error[0].Erro);
      } else if (res.status == 500) {
        this.presentToast(res.error[0].Erro);
      }
      loading.dismiss();
    });

  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
