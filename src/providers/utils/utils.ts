import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActionSheetController, Platform} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { SocialSharing } from "@ionic-native/social-sharing";
import { ConfigProvider } from "../config/config";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Injectable()
export class UtilsProvider {

  public favoritesCache:String;

  public static SORT_TYPE = 'NOME';

  public AUDIOVISUAL = "audiovisual";
  public CAMPUSJOURNAL = "campusjournal";

  public readonly MONTH_ARRAY = ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(public http: HttpClient, public platform: Platform, private storage: Storage,
              private socialSharing: SocialSharing, private actionSheetCtrl: ActionSheetController,
              private inAppBrowser: InAppBrowser) {
  }

  isOdd(num){
    return (num % 2) == 1;
  }

  formatDataPostagem(ms){
    let dataPost = Date.now() - Number(ms);
    let tm;
    if(dataPost < 60000){
      return ((dataPost % 60000) / 1000) + "s";
    } else if(dataPost < 3600000){
      return Math.floor(dataPost / 60000) + "m";
    } else if(dataPost < 86400000){
      return Math.floor(dataPost / 3600000) + "h";
    } else if(dataPost < 31556952000){
      tm = Math.floor(dataPost / 86400000) == 1 ?" dia":" dias";
      return Math.floor(dataPost / 86400000) + tm;
    } else if(dataPost >= 31556952000){
      tm = Math.floor(dataPost / 31556952000) == 1 ?" ano":" anos";
      return Math.floor(dataPost / 31556952000) + tm;
    }
  }

  filterHeight(){
    if      (this.platform.is('android')) return 'android-height';
    else if (this.platform.is('ios')) return 'ios-height';
    else if (this.platform.is('windows')) return 'wp-height';
    else return '';
  }

  filterListRadio(){
    if      (this.platform.is('android')) return 'android';
    else if (this.platform.is('ios')) return 'ios';
    else return '';
  }

  toggleFavorito(fav){
    this.storage.get('Favorites').then((favorites) => {
      if(favorites == null) favorites = '';
      if(favorites.indexOf(fav) == -1){
        this.storage.set('Favorites', favorites+','+fav);
        this.favoritesCache = favorites+','+fav;
      } else {
        this.storage.set('Favorites', favorites.replace(','+fav, ''));
        this.favoritesCache = favorites.replace(','+fav, '');
      }
    });
  }

  popularFavorito(){
    this.storage.get('Favorites').then((favorites) => {
      if(favorites == null) this.favoritesCache = '';
      else this.favoritesCache = favorites;
    });
  }

  toggleSubItem(idItem:string){
    if(document.getElementById(idItem).style.display == 'none'){
      document.getElementById(idItem).style.display = 'block';
    }else{
      document.getElementById(idItem).style.display = 'none';
    }
  }

  removerAcentos(str: string){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  formatarData(isoDate: string) {
    try {
      let date = new Date(isoDate);
      //let dia = date.getUTCDate().toString().length == 1 ? "0" + date.getUTCDate() : date.getUTCDate();
      return date.getUTCDate() + " de " + this.MONTH_ARRAY[date.getUTCMonth()] + " de " + date.getUTCFullYear();
    } catch (err) {
      return isoDate
    }
  }

  private readonly SHARE_CFG = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
  private readonly FACEBOOK_LINK = "https://www.facebook.com/sharer/sharer.php?u=";
  private readonly TWITTER_LINK = "https://twitter.com/home?status=";
  private readonly GOOGLE_PLUS_LINK = "https://plus.google.com/share?url=";

  compartilharDoc(doc) {
    //this.socialSharing.share(null,null, null, ConfigProvider.ENDPOINT + '/#/?doc=' + doc.audiovisual_id);

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Compartilhando ' + doc.title,
      buttons: [
        /*
        {
          text: 'Whatsapp',
          handler: () => {

            window.open("whatsapp://send?text=" + ConfigProvider.ENDPOINT + '/#/?doc=' + doc.audiovisual_id)
          }
        },
        */
        {
          text: 'Facebook',
          handler: () => {

            window.open(this.FACEBOOK_LINK + ConfigProvider.ENDPOINT + '/#/?doc=' + doc.audiovisual_id, '_blank', this.SHARE_CFG)
          }
        },
        {
          text: 'Twitter',
          handler: () => {

            window.open(this.TWITTER_LINK + ConfigProvider.ENDPOINT + '/#/?doc=' + doc.audiovisual_id, '_blank', this.SHARE_CFG)
          }
        },
        {
          text: 'Google Plus',
          handler: () => {

            window.open(this.GOOGLE_PLUS_LINK + ConfigProvider.ENDPOINT + '/#/?doc=' + doc.audiovisual_id, '_blank', this.SHARE_CFG)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    actionSheet.present();
  }

  curtirDoc() {

  }

}
