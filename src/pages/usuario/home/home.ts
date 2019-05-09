import {Component} from '@angular/core';
import {
  App, Events, IonicPage, LoadingController, MenuController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {UtilsProvider} from "../../../providers/utils/utils";
import {Storage} from '@ionic/storage';
import {BooksPage} from "../../acervo/books/books";
import {LoginPage} from "../login/login";

@IonicPage({
  segment: 'detail/:id',
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  timeline: any = '';
  noticias: any = '';

  acervo: any = '';

  logged: boolean;
  showLoginButton: boolean = false;

  loading: any;
  platform: Platform;

  userInfo: any = {
    c_nome: '',
    c_email: '',
    role: 'none'
  };

  inactiveUsers: any = 0;
  eventosCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public menu: MenuController, public utils: UtilsProvider, public events: Events,
              public storage: Storage, public loadingCtrl: LoadingController, public plt: Platform,
              public appCtrl: App) {

    this.utils.popularFavorito();

    this.storage.get('Logged').then((logg) => {
      if (logg == null) {
        this.logged = false;
        this.showLoginButton = true;
      } else {
        this.logged = logg;
        this.showLoginButton = false;
      }
      if (!logg) {
        this.showLoginButton = true;
      }
    });

    this.platform = plt;

    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();

    //this.storage.get('Favorites').then((favorites) => {
    //if(favorites == null) favorites = '';
    //this.utils.favoritesCache = ''+favorites;
    //});

    this.timeline = null;

    api.getNoticias().subscribe((res) => {
      this.noticias = res;
    });

    api.getDocsAudiovisual().subscribe((res: any) => {
      this.acervo = res.slice(0, 3);
    });

    this.api.getUserInfo().then((resolve: any) => {
      resolve.subscribe((res: any) => {

          if (res.status == 200) {
            this.userInfo = res.body.user;

            if (this.userInfo.role == 'admin') {

              this.api.getUsersByActive(false).then((resolve: any) => {
                resolve.subscribe((res: any) => {
                    if (res.status == 200) {
                      this.inactiveUsers = res.body.length;
                      this.storage.set('inactiveUsers', this.inactiveUsers);
                    }

                  }, (res) => {

                  }
                );
              });
            }

          }

          this.loading.dismiss();

        }, (res) => {
          //if (res.status == 401){
          this.api.logout();
          this.storage.get('Logged').then((logg) => {
            if (logg == null) this.logged = false;
            else this.logged = logg;
          });
          this.loading.dismiss();
          //}
        }
      );
    });

    this.getEventosCount()

    this.verifySharedUrl()
  }

  ionViewWillEnter() {
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(true, 'homeMenu');
    this.storage.get('inactiveUsers').then((inactiveUsers) => {
      this.inactiveUsers = inactiveUsers;
    });
    this.getEventosCount()
  }

  ionViewDidEnter() {
    //this.events.publish('home:colorChange', true);
  }

  ionViewDidLeave() {
    //this.events.publish('home:colorChange', false);
  }

  transparentActive: boolean = false;
  headerActive: boolean = false;

  onScroll(event) {
    if (event.scrollTop < 5) {
      if (!this.transparentActive) {
        let classN = document.getElementById('dynamicHeader').className;
        document.getElementById('dynamicHeader').className = classN.replace(/ h-active/g, '');
        this.transparentActive = true;
        this.headerActive = false;
      }
    } else if (event.scrollTop > 5) {
      if (!this.headerActive) {
        document.getElementById('dynamicHeader').className += ' h-active';
        this.transparentActive = false;
        this.headerActive = true;
      }
    }
  }

  getIosClass() {
    if (this.platform.is('ios')) {
      return '-ios';
    }
  }

  abrirDetalhesNoticia(item) {
    this.navCtrl.push('NoticiaDetailsPage', {item: item});
  }

  abrirDetalhesLivro(item) {
    this.navCtrl.push('BookDetailsPage', {item: item});
  }

  abrirDetalhesDoc(item, t) {
    this.navCtrl.push('DocDetailsPage', {item: item, tipo: t});
  }

  abrirGestao() {
    this.navCtrl.push('GestaoPage', {inactiveUsers: this.inactiveUsers});
  }

  abrirCategorias() {
    this.navCtrl.push(BooksPage);
    //this.navCtrl.push('BookListPage', {carregarTodos: true});
    //this.navCtrl.push('DocListPage', {carregarTodos: true});
  }

  abrirBoletim() {
    this.navCtrl.push('BoletimPage');
  }

  abrirEventos() {
    this.navCtrl.push('EventosPage');
  }

  abrirAbout() {
    this.navCtrl.push('AboutPage');
  }

  abrirLogin() {
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  formatText(text: String, length) {
    if (length >= text.length) return text;
    return text.substring(0, length) + "...";
  }

  async getEventosCount() {
    try {
      this.eventosCount = (<any>await this.api.getEventos()).length;
    } catch (err) {
      this.eventosCount = 0;
    }
  }


  async verifySharedUrl() {
    let doc = null;

    if (document.URL.indexOf("?") > 0) {
      let splitParams = document.URL.split("?")[1].split("&");
      for (let i in splitParams){
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "doc"){
          doc = singleURLParam[1];
        }
      }
    }

    if (doc != null) {
      try {
        let d = (await (await this.api.getDocsFavorito()).toPromise())[0];
        this.navCtrl.push('DocDetailsPage', {item: d, tipo: this.utils.AUDIOVISUAL});
      } catch (err) {}
    }
  }

}
