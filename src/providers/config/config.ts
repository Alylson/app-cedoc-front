import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class ConfigProvider {

  /* Configurações de conexão com o back-end */
  public static readonly ENDPOINT = 'http://127.0.0.1';
  //public static readonly ENDPOINT = 'http://192.168.25.5';

  constructor(public http: HttpClient, private storage: Storage) {}

  async getAuthorizationHeader() {
    let authToken = "";
    try {
      authToken = await this.storage.get('AuthToken');
    } catch (err) {}
    return new HttpHeaders({ Authorization: authToken });
  }

}
