import {Component} from '@angular/core';
import {IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {UtilsProvider} from "../../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})
export class BooksPage {

  categoriasCache:any;
  categorias:any;

  entidadesLength:any;
  loading:any;

  audiovisual: any;
  campusjournal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public menu: MenuController, public loadingCtrl: LoadingController, public utils: UtilsProvider) {

    this.categorias = null;
    this.entidadesLength = null;

    this.audiovisual = this.utils.AUDIOVISUAL;
    this.campusjournal = this.utils.CAMPUSJOURNAL;

    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();

    /*
     * Faz um Request das informações ao Back-end, recebendo
     * um objeto JSON como response.
     */
    this.api.getEntidades().subscribe( (res:any) => {
      this.entidadesLength = res.length;
      this.loading.dismiss();
    });
    this.api.getCategorias().subscribe( (res) => {
      this.categoriasCache = res;
      this.categorias = res;
    });
  }

  ionViewCanEnter() {
    //return new Promise((resolve, reject) => {
    //});
  }

  ionViewWillEnter() {
    /* Ativa o Menu da pagina. */
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(true, 'homeMenu');
  }

  ionViewDidEnter(){

  }

  filtrarCategorias(ev){
    this.categorias = this.categoriasCache;
    let query = this.utils.removerAcentos(ev.target.value).toLowerCase().replace(/\s/g, "");
    if (query && query.trim() != '') {
      this.categorias = this.categoriasCache.filter((item) => {
        let resultString = this.utils.removerAcentos(item.categoria.toLowerCase());
        return resultString.indexOf(query) > -1;
      })
    }
  }

  abrirTodos(t){
    //this.navCtrl.push('BookListPage', {carregarTodos: true});
    this.navCtrl.push('DocListPage', {carregarTodos: true, tipo: t});
  }

  abrirCategoria(ctgId, t){
    this.navCtrl.push('DocListPage', {categoria: ctgId, tipo: t});
  }

  voltar(){
    this.navCtrl.pop();
  }

  transparentActive:boolean = false;
  headerActive:boolean = false;

  onScroll(event){

    if(event.scrollTop < 5){
      if(!this.transparentActive){
        let classN = document.getElementById('dynamicHeader').className;
        document.getElementById('dynamicHeaderBook').className = classN.replace(/ h-active/g, '');
        this.transparentActive = true;
        this.headerActive = false;
      }
    } else if(event.scrollTop > 5){
      if(!this.headerActive){
        document.getElementById('dynamicHeaderBook').className += ' h-active';
        this.transparentActive = false;
        this.headerActive = true;
      }
    }
  }

}
