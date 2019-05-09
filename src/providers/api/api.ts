import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigProvider} from "../config/config";
import {Storage} from '@ionic/storage';

@Injectable()
export class ApiProvider {

  public logged: boolean;

  constructor(public httpClient: HttpClient, public config: ConfigProvider, private storage: Storage) {
  }

  /**
   * DOCS
   */
  getFormatedDocsAudiovisual(categoriaId = null) {
    if (categoriaId != null) {
      return this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/formatado/audiovisual/categoria/' + categoriaId);
    } else {
      return this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/formatado/audiovisual');
    }
  }

  getDocsAudiovisual() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/audiovisual');
  }

  getDocsCampusjournal() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/campusjournal');
  }

  getCategorias() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/categorias');
  }

  getDocsFavorito(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('Favorites').then((favorites) => {
        if (favorites == null) favorites = " ";
        let query = favorites.slice(1);
        resolve(this.httpClient.get(ConfigProvider.ENDPOINT + '/doc/formatado/audiovisual?favs=' + query));
      });
    });
  }

  /** FIM DOCS */

  getTimeline() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/newsfeed');
  }

  getNoticia(pk) {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/noticias/' + pk);
  }

  getNoticias() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/noticias/');
  }

  getEntidades() {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/livros');
  }

  getEntidadesPorCategoria(categoria) {
    return this.httpClient.get(ConfigProvider.ENDPOINT + '/livros?categoria=' + categoria);
  }

  /**
   * EVENTOS
   */

  async cadastrarEvento(evento) {
    return this.httpClient.post (
      ConfigProvider.ENDPOINT + '/eventos',
      evento,
      {
        headers: await this.config.getAuthorizationHeader(),
        observe: 'response'
      }
    )
  }

  async getEventos() {
    return (await this.httpClient.get(ConfigProvider.ENDPOINT + '/eventos', { observe: 'response' }).toPromise()).body
  }

  /**
   * FIM EVENTOS
   */

  /**
   * AUTH
   */

  auth(userEmail, userSenha) {
    let body = {
      email: userEmail,
      senha: userSenha
    };
    return this.httpClient.post(ConfigProvider.ENDPOINT + '/auth', body, {observe: 'response'});
  }

  logout() {
    this.storage.set('AuthToken', null);
    this.storage.set('Logged', false);
    //this.storage.set('Favorites', "");
    this.logged = false;
  }

  /**
   * FIM AUTH
   */

  cadastrarUsuario(usuario) {
    return this.httpClient.post(ConfigProvider.ENDPOINT + '/usuario', usuario, {observe: 'response'});
  }

  recuperarSenha(email) {
    return this.httpClient.post(ConfigProvider.ENDPOINT + '/usuario/recovery', { email: email }, {observe: 'response'});
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        //let body = {
        //token: authToken
        //};
        const headers = new HttpHeaders({
          Authorization: authToken
        });
        resolve(this.httpClient.get(ConfigProvider.ENDPOINT + '/auth', {headers, observe: 'response'}));
      });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        const headers = new HttpHeaders({
          Authorization: authToken
        });
        resolve(this.httpClient.get(ConfigProvider.ENDPOINT + '/usuario', {headers, observe: 'response'}));
      });
    });
  }

  getUsersByActive(active: boolean) {
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        const headers = new HttpHeaders({
          Authorization: authToken
        });
        resolve(this.httpClient.get(ConfigProvider.ENDPOINT + '/usuario?active=' + active,
          {headers, observe: 'response'}));
      });
    });
  }

  getFavoritesInfo() {
    return new Promise((resolve, reject) => {
      this.storage.get('Favorites').then((favorites) => {
        if (favorites == null) favorites = " ";
        let query = favorites.slice(1);
        resolve(this.httpClient.get(ConfigProvider.ENDPOINT + '/favorites?favs=' + query));
      });
    });
  }

  alterarStatus(status: boolean, id: any) {
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        let body = {
          status: status
        };
        const headers = new HttpHeaders({
          Authorization: authToken
        });
        resolve(this.httpClient.post(ConfigProvider.ENDPOINT + '/usuario/' + id + '/status', body, {
          headers,
          observe: 'response'
        }));
      });
    });
  }

  alterarRole(role: any, id: any) {
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        let body = {
          role: role
        };
        const headers = new HttpHeaders({
          Authorization: authToken
        });
        resolve(this.httpClient.post(ConfigProvider.ENDPOINT + '/usuario/' + id + '/role', body, {
          headers,
          observe: 'response'
        }));
      });
    });
  }

  async isLogged() {
    let logg = await this.storage.get('Logged');
    return logg == null ? false : logg
  }

}
