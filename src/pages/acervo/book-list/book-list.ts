import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, MenuController, NavController,
  NavParams, Platform, PopoverController
} from 'ionic-angular';

import {UtilsProvider} from "../../../providers/utils/utils";
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";
import {PopOver} from "./pop-over";

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  public entidadesCache: any;
  public entidades: any;
  loading: any;

  plt: Platform;
  logged: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public menu: MenuController, public events: Events, public utils: UtilsProvider,
              public loadingCtrl: LoadingController, private alertCtrl: AlertController,
              private plat: Platform, private storage: Storage, public popoverCtrl: PopoverController) {

    this.plt = plat;

    this.utils.popularFavorito();

    this.storage.get('Logged').then((logg) => {
      if(logg == null) {
        this.logged = false;
      } else {
        this.logged = logg;
      }
    });

    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();

    /*
     * Faz um Request das informações ao Back-end, recebendo
     * um objeto JSON como response.
     */
    if(this.navParams.get('carregarTodos')){
      api.getEntidades().subscribe( (res) => {
        this.entidadesCache = res;
        this.entidades = res;
        this.sortBooks(UtilsProvider.SORT_TYPE);
        this.loading.dismiss();
      });
    } else if(this.navParams.get('categoria') != null) {
      api.getEntidadesPorCategoria(this.navParams.get('categoria')).subscribe( (res) => {
        this.entidadesCache = res;
        this.entidades = res;
        this.sortBooks(UtilsProvider.SORT_TYPE);
        this.loading.dismiss();
      });
    } else {
      api.getEntidades().subscribe( (res) => {
        this.entidadesCache = res;
        this.entidades = res;
        this.sortBooks(UtilsProvider.SORT_TYPE);
        this.loading.dismiss();
      });
    }

    /* Escuta os events e define callbacks. */
    events.subscribe('function:sortBooks', (sortType) => {
      this.sortBooks(sortType);
    });
  }

  ionViewWillEnter() {
    /* Ativa o Menu da pagina. */
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(false, 'homeMenu');
  }

  abrirDetalhesLivro(item){
    this.navCtrl.push('BookDetailsPage', {item: item});
  }

  filtrarEntidades(ev){
    this.entidades = this.entidadesCache;
    let query = ev.target.value;
    if (query && query.trim() != '') {
      this.entidades = this.entidadesCache.filter((item) => {
        return (item.c_nome.concat(item.c_autor).toLowerCase().indexOf(query.toLowerCase()) > -1);
      })
    }
  }

  sortBooks(sortType){
    switch(sortType){
      case 'NOME':
          this.entidades.sort((a, b) => {return a.c_nome < b.c_nome ? -1 : 1;});
          break;
      case 'AUTOR':
          this.entidades.sort((a, b) => {return a.c_autor < b.c_nome ? -1 : 1;});
          break;
      case 'DATA_PUBLI':
          this.entidades.sort((a, b) => {return a.d_publi < b.d_publi ? -1: 1;}); //<<<<<< Arrumar
          break;
      case 'DATA_POST':
          this.entidades.sort((a, b) => {return a.n_datapost - b.n_datapost;});
          break;
      case 'DISP_DOWNLOAD':
          this.entidades.sort((a, b) => {return a.c_dispebook == b.c_dispebook ? -1 : 1;});
          break;
      case 'DISP_BIBLIOTECA':
          this.entidades.sort((a, b) => {return a.c_displocal == b.c_displocal ? -1 : 1;});
          break;
    }
  }

  voltar(){
    this.navCtrl.pop();
  }

  formatText(text:String, length){
    if(length >= text.length) return text;
    return text.substring(0, length) + "...";
  }

  presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(PopOver);

    popover.present({
      ev: ev
    });
  }

}
