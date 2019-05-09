import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  nome:string = '';
  email:string = '';
  senha:string = '';
  senhaConfirm:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              private storage: Storage, public events: Events, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
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
      duration: 2000
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

  login(){
    this.navCtrl.popToRoot();
  }

  cadastro(){
    if(this.nome.length < 3){
      this.presentToast('Seu nome precisa ter pelo menos 3 caracteres');
      return;
    }else if(!this.validateEmail(this.email)){
      this.presentToast('Digite seu email no formato nome@email.com');
      return;
    }else if(this.senha.length < 4){
      this.presentToast('Sua senha precisa ter pelo menos 4 caracteres');
      return;
    }else if(this.senha != this.senhaConfirm){
      this.presentToast('Suas senhas não conferem');
      return;
    }

    let usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }

    let loading = this.loadingCtrl.create({
      content: 'Autenticando'
    });
    loading.present();

    this.api.cadastrarUsuario(usuario).subscribe((res:any) => {
      console.log(res);
      if(res.status == 201) {
        this.navCtrl.push(LoginPage, {cadastro: true})
      }
      loading.dismiss();
    }, (res) => {
      if (res.status == 403){
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
