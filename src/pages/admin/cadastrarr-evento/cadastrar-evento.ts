import {Component} from '@angular/core';
import {
  AlertController, App, IonicPage, LoadingController, NavController, NavParams, Platform,
  ToastController
} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-cadastrar-evento',
  templateUrl: 'cadastrar-evento.html',
})
export class CadastrarEventoPage {

  plt: Platform;

  loading: any;

  autocomplete: any;

  evento: any = {
    c_titulo: null,
    c_local: null,
    c_data: null,
    c_horario: null,
    c_datacompleta: null,
    c_local_lat: null,
    c_local_long: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public plat: Platform,
              private api: ApiProvider, private appCtrl: App, private loadingCtrl: LoadingController,
              public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    this.plt = plat;
  }

  ionViewDidLoad() {
    //this.setAutoConplete()
  }

  voltar() {
    this.navCtrl.pop();
  }

  enviarEvento() {
    if (this.validateFields()) {

      let context = this;
      this.evento.c_datacompleta = this.evento.c_data + "T" + this.evento.c_horario;

      this.loading = this.loadingCtrl.create({
        content: 'Enviando'
      });
      this.loading.present();

      this.api.cadastrarEvento(this.evento).then((resolve: any) => {

        resolve.subscribe((res: any) => {

            if (res.status == 200 || res.status == 201) {
              context.voltar();
            }
            this.loading.dismiss();
          }, (res) => {
            context.presentToast('Não foi possível cadastrar esse evento, tente novamente!')
            this.loading.dismiss();
          }
        );
      });
    }
  }

  setAutoConplete() {
    let context = this;
    let elem = <HTMLInputElement>document.getElementsByClassName('text-input')[1];
    this.autocomplete = new google.maps.places.Autocomplete(elem);

    /* Limita os resultados da pesaquisa para somente locais do Brasil */
    this.autocomplete.setComponentRestrictions({'country': ['br']});

    this.autocomplete.addListener('place_changed', function () {

      if (!context.autocomplete.getPlace().geometry) {
        context.presentToast("Selecione um endereço válido");
      } else {
        context.evento.c_local_lat = context.autocomplete.getPlace().geometry.location.lat();
        context.evento.c_local_long = context.autocomplete.getPlace().geometry.location.lng();
      }
    });
  }

  validateFields(): boolean {

    if (this.evento.c_titulo == null || this.evento.c_titulo == '') {
      this.presentToast('Digite um nome válido');
      return false
    }

    if (this.evento.c_data == null || this.evento.c_data == '') {
      this.presentToast('Escolha uma data válida');
      return false
    }

    if (this.evento.c_horario == null || this.evento.c_horario == '') {
      this.presentToast('Escolha um horário válido');
      return false
    }

    if (this.evento.c_local == null || this.evento.c_local == '') {
      this.presentToast('Digite um endereço válido');
      return false
    }

    return true
  }

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
