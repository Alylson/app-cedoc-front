import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { NavPage } from "../nav/nav";
import { ApiProvider } from "../../../providers/api/api";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  senha:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              private storage: Storage, public events: Events, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    if (this.navParams.get('cadastro')) {
      this.presentToast('Usuário cadastrado com sucesso! Peça para um administrador ativar sua conta');
    }

    if (this.navParams.get('recovery')) {
      let alert = this.alertCtrl.create({
        title: 'Enviado com sucesso!',
        subTitle: 'Enviamos os passos para recuperar sua senha ao seu email de cadastro. ' +
        'Caso não tenha chegado nenhum email, verifique sua caixa de spam ou tente novamente depois de 10 minutos.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    //this.storage.get("Logged").then((logged) => {
      //if(logged) this.navCtrl.setRoot(NavPage);
    //});
  }

  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 10000
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

  recuperarSenha() {
    this.navCtrl.push('RecuperarSenhaPage');
  }

  cadastro(){
    this.navCtrl.push('CadastroPage');
  }

  voltar() {
    this.navCtrl.setRoot(NavPage);
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Autenticando'
    });
    loading.present();
    this.api.auth(this.email, this.senha).subscribe((res:any) => {
      if(res.status == 200) {
        if (res.body.success) {
          this.storage.set('AuthToken', res.body.Auth);
          this.storage.set('Logged', true);
          this.api.logged = true;
          loading.dismiss();
          this.navCtrl.setRoot(NavPage);
        }
      } else {
        this.storage.set('Logged', false);
        loading.dismiss();
      }
    }, (res) => {
      if (res.status == 403){
        this.presentToast(res.error[0].Erro);
      } else if (res.status == 401) {
        this.presentToast(res.error[0].Erro);
      } else if (res.status == 500) {
        this.presentToast(res.error[0].Erro);
      }
      loading.dismiss();
      this.storage.set('AuthToken', null);
      this.storage.set('Logged', false);
      //console.log(res.HttpErrorResponse);
    });
  }

}
