import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {UtilsProvider} from "../../../providers/utils/utils";

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  logged: any;

  plt: Platform;
  loading: Loading;
  eventos: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public plat: Platform,
              public api: ApiProvider, private loadingCtrl: LoadingController, public utils: UtilsProvider) {

    this.plt = plat;
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    this.loadEventosList();
  }

  async loadEventosList() {
    await this.loading.present();
    this.logged = await this.api.isLogged();
    this.eventos = await this.api.getEventos();
    this.loading.dismiss()
  }

  async renderMaps(checkObject: boolean = false) {
    if ((checkObject) && (this.eventos != null || this.eventos.length == 0)) {
      this.eventos = await this.api.getEventos();
    }
    /*
    for (let i in this.eventos) {
      console.log("Rendering map-" + i + " Lat > " + this.eventos[i].c_local_lat + " Long > " + this.eventos[i].c_local_long);
      try {
        let location = {lat: this.eventos[i].c_local_lat, lng: this.eventos[i].c_local_long};
        let cardMap = new google.maps.Map(document.getElementById('map-' + i), {zoom: 15, center: location});
        new google.maps.Marker({position: location, map: cardMap});
        console.log("Rendered");
      } catch (err) {
      }
    }
    */
  }

  voltar(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //this.renderMaps(false);
  }

  ionViewDidEnter() {
    this.renderMaps(true);
  }

}
