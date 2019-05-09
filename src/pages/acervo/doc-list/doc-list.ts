import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, MenuController, NavController,
  NavParams, Platform, PopoverController
} from 'ionic-angular';

import {UtilsProvider} from "../../../providers/utils/utils";
import {ApiProvider} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";
import {PopOverDoc} from "./pop-over-doc";

@IonicPage()
@Component({
  selector: 'page-doc-list',
  templateUrl: 'doc-list.html',
})
export class DocListPage {

  public docsCache: any;
  public docs: any;
  loading: any;

  plt: Platform;
  logged: boolean;

  tipo: string;

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
    switch (this.navParams.get('tipo')) {
      case this.utils.AUDIOVISUAL: {
        this.tipo = this.utils.AUDIOVISUAL;
        if (this.navParams.get('categoria') != null) {
          this.atualizarListDocsAudiovisual(this.navParams.get('categoria'));
        } else {
          this.atualizarListDocsAudiovisual();
        }
        break;
      }
      case this.utils.CAMPUSJOURNAL:
        this.tipo = this.utils.CAMPUSJOURNAL;
        this.atualizarListDocsCampusJournal();
        break;
    }

    /* Escuta os events e define callbacks. */
    events.subscribe('function:sortBooks', (sortType) => {
      this.sortBooks(sortType);
    });
  }

  atualizarListDocsCampusJournal(){
    this.api.getDocsCampusjournal().subscribe( (res) => {
      this.docsCache = res;
      this.docs = res;
      this.sortBooks(UtilsProvider.SORT_TYPE);
      this.loading.dismiss();
    });
  }

  atualizarListDocsAudiovisual(categoriaId = null){
    this.api.getFormatedDocsAudiovisual(categoriaId).subscribe( (res) => {
      this.docsCache = res;
      this.docs = res;
      this.sortBooks(UtilsProvider.SORT_TYPE);
      this.loading.dismiss();
    });
  }

  ionViewWillEnter() {
    /* Ativa o Menu da pagina. */
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(false, 'homeMenu');
  }

  abrirDetalhesDoc(item, t){
    this.navCtrl.push('DocDetailsPage', {item: item, tipo: t});
  }

  filtrarEntidades(ev){
    this.docs = this.docsCache.slice();
    let query = this.utils.removerAcentos(ev.target.value).toLowerCase().replace(/\s/g, "");

    if (query && query.trim() != '') {

      if (this.tipo == this.utils.CAMPUSJOURNAL) {

        this.docs = this.docs.filter((item) => {

            let resultString = this.utils.removerAcentos(
              item.title
                .concat(item.description)
                .concat(item.author)
                .concat(item.source)
                .toLowerCase()
            );

            return resultString.indexOf(query) > -1;
          }
        )

      } else if (this.tipo == this.utils.AUDIOVISUAL) {

        let res = [];
        let docRes;

        for (let count in this.docs) {

          res.push(this.docs[count]);
          docRes = [];

          for (let doc of res[count].docs) {

            let resultString = this.utils.removerAcentos(
              doc.title
                .concat(doc.source)
                .concat(doc.sender)
                .toLowerCase()
            ).replace(/\s/g, "");

            console.log("RESULT > " + (resultString.indexOf(query) > -1));

            if (resultString.indexOf(query) > -1) {
              docRes.push(doc);
            }
          }

          res[count].docs = docRes;
        }

        this.docs = res;
      }
    } else {
      switch (this.navParams.get('tipo')) {
        case this.utils.AUDIOVISUAL: {
          this.tipo = this.utils.AUDIOVISUAL;
          if (this.navParams.get('categoria') != null) {
            this.atualizarListDocsAudiovisual(this.navParams.get('categoria'));
          } else {
            this.atualizarListDocsAudiovisual();
          }
          break;
        }
        case this.utils.CAMPUSJOURNAL:
          this.tipo = this.utils.CAMPUSJOURNAL;
          this.atualizarListDocsCampusJournal();
          break;
      }
    }
  }

  sortBooks(sortType){
    switch(sortType){
      case 'NOME':
        this.docs.sort((a, b) => {return a.c_nome < b.c_nome ? -1 : 1;});
        break;
      case 'AUTOR':
        this.docs.sort((a, b) => {return a.c_autor < b.c_nome ? -1 : 1;});
        break;
      case 'DATA_PUBLI':
        this.docs.sort((a, b) => {return a.d_publi < b.d_publi ? -1: 1;}); //<<<<<< Arrumar
        break;
      case 'DATA_POST':
        this.docs.sort((a, b) => {return a.n_datapost - b.n_datapost;});
        break;
      case 'DISP_DOWNLOAD':
        this.docs.sort((a, b) => {return a.c_dispebook == b.c_dispebook ? -1 : 1;});
        break;
      case 'DISP_BIBLIOTECA':
        this.docs.sort((a, b) => {return a.c_displocal == b.c_displocal ? -1 : 1;});
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
    let popover = this.popoverCtrl.create(PopOverDoc);

    popover.present({
      ev: ev
    });
  }

}
