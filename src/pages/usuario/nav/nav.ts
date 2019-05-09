import {ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {App, Events, IonicPage, MenuController, NavController, Tabs} from 'ionic-angular';
import {HomePage} from "../home/home";
import {BooksPage} from "../../acervo/books/books";
import {FavoritesPage} from "../favorites/favorites";
import {ProfilePage} from "../profile/profile";
import {ApiProvider} from "../../../providers/api/api";
import {UtilsProvider} from "../../../providers/utils/utils";
import {LoginPage} from "../login/login";
import {LinksPage} from "../links/links";
import {Storage} from "@ionic/storage";

@Injectable()
@IonicPage()
@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html'
})
export class NavPage {

  userInfos:any = {
    c_nome: '',
    c_email: ''
  }
  logged:boolean;
  sortType:any = 'NOME';

  homeRoot = HomePage;
  booksRoot = BooksPage;
  favoritesRoot = FavoritesPage;
  profileRoot = ProfilePage;
  linksRoot = LinksPage;

  constructor(public navCtrl: NavController, public menu: MenuController, public api: ApiProvider,
              public events: Events, public utils: UtilsProvider, public appCtrl: App,
              public storage: Storage, private cdRef: ChangeDetectorRef) {

    this.storage.get('Logged').then((logg) => {
      if(logg == null) this.logged = false;
      else this.logged = logg;
    });

    this.api.getUserInfo().then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){ this.userInfos = res.body.user;}
        }, (res:any) => {
          //if (res.status == 401){
            this.api.logout();
            this.storage.get('Logged').then((logg) => {
              if(logg == null) this.logged = false;
              else this.logged = logg;
            });
            this.cdRef.detectChanges()
          //}
        }
      );
    });

  }

  irParaHome(tabs){
    tabs.select(0);
    this.menu.close('homeMenu');
  }

  irParaCategorias(tabs){
    tabs.select(1);
    this.menu.close('bookMenu');
  }

  irParaFavoritos(tabs){
    tabs.select(2);
    this.menu.close('homeMenu');
  }

  irParaProfile(tabs){
    tabs.select(3);
    this.menu.close('homeMenu');
  }

  logout(){
    this.api.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  callSortBooks(){
    this.events.publish('function:sortBooks', this.sortType);
  }

}
