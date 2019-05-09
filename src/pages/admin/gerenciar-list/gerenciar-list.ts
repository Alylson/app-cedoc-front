import { Component } from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {ApiProvider} from "../../../providers/api/api";
import {NavPage} from "../../usuario/nav/nav";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-gerenciar-list',
  templateUrl: 'gerenciar-list.html',
})
export class GerenciarListPage {

  plt: Platform;
  optionPosition: any;

  users:any = '';
  usersCache:any = '';

  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plat: Platform,
              private api: ApiProvider, private appCtrl: App, private loadingCtrl: LoadingController,
              public storage: Storage, public alertCtrl: AlertController) {
    this.plt = plat;
    this.optionPosition = this.navParams.get('position');
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
    switch(this.optionPosition){
      case 1:
        this.getAllUsers();
        break;
      case 2:
        this.getUsersByActive();
        break;
    }
  }

  filtrarEntidades(ev){
    switch(this.optionPosition){
      case 1:{
        this.users = this.usersCache;
        let query = ev.target.value;
        if (query && query.trim() != '') {
          this.users = this.usersCache.filter((item) => {
            return (item.c_nome.concat(item.c_email).concat(item.role).toLowerCase().indexOf(query.toLowerCase()) > -1);
          })
        }
        break;
      }
      case 2:{
        this.users = this.usersCache;
        let query = ev.target.value;
        if (query && query.trim() != '') {
          this.users = this.usersCache.filter((item) => {
            return (item.c_nome.concat(item.c_email).concat(item.role).toLowerCase().indexOf(query.toLowerCase()) > -1);
          })
        }
        break;
      }
    }
  }

  getAllUsers(){
    this.api.getUsers().then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){
            this.usersCache = res.body;
            this.users = res.body;
            let count = 0;
            for(let user of this.users){
              if(user.active == 'false'){
                ++count;
              }
            }
            this.storage.set('inactiveUsers', count);
          }
          try {
            this.loading.dismiss();
          } catch (e){}
        }, (res) => {
          //if (res.status == 401){
          try {
            this.loading.dismiss();
          } catch (e){}
          this.api.logout();
          this.appCtrl.getRootNav().setRoot(NavPage);
          //}
        }
      );
    });
  }

  getUsersByActive(){
    this.api.getUsersByActive(false).then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){
            this.usersCache = res.body;
            this.users = res.body;
            this.storage.set('inactiveUsers', res.body.length);
          }
          try {
            this.loading.dismiss();
          } catch (e){}
        }, (res) => {
          //if (res.status == 401){
          try {
            this.loading.dismiss();
          } catch (e){}
          this.api.logout();
          this.appCtrl.getRootNav().setRoot(NavPage);
          //}
        }
      );
    });
  }

  voltar(){
    this.navCtrl.pop();
  }

  formatDate(ms){
    return new Date(ms).toLocaleString();
  }

  formatText(text:String, length){
    if(length >= text.length) return text;
    return text.substring(0, length) + "...";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  alterarPermissao(user:any) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Permissão');

    alert.addInput({
      type: 'radio',
      label: 'Aluno',
      value: 'aluno',
      checked: user.role == 'aluno'
    });

    alert.addInput({
      type: 'radio',
      label: 'Professor',
      value: 'professor',
      checked: user.role == 'professor'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Alterar',
      handler: (data: any) => {
        this.alterarRole(data, user.n_pkid)
      }
    });

    alert.present();
  }

  alterarStatus(status:boolean, id:any){
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
    this.api.alterarStatus(status, id).then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){
            if(!status){

            }
            switch(this.optionPosition){
              case 1:
                this.getAllUsers();
                break;
              case 2:
                this.getUsersByActive();
                break;
            }
          }
        }, (res) => {
          //if (res.status == 401){
          try {
            this.loading.dismiss();
          } catch (e){}
          this.api.logout();
          this.appCtrl.getRootNav().setRoot(NavPage);
          //}
        }
      );
    });
  }

  alterarRole(role:any, id:any){
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
    this.api.alterarRole(role, id).then((resolve:any) => {
      resolve.subscribe((res:any) => {
          if(res.status == 200){
            switch(this.optionPosition){
              case 1:
                this.getAllUsers();
                break;
              case 2:
                this.getUsersByActive();
                break;
            }
          }
        }, (res) => {
          //if (res.status == 401){
          try {
            this.loading.dismiss();
          } catch (e){}
          this.api.logout();
          this.appCtrl.getRootNav().setRoot(NavPage);
          //}
        }
      );
    });
  }

}
