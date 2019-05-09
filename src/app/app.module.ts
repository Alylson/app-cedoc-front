import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { BooksPageModule } from "../pages/acervo/books/books.module";
import { ConfigProvider } from '../providers/config/config';
import { ApiProvider } from '../providers/api/api';
import { UtilsProvider } from '../providers/utils/utils';
import { FavoritesPageModule } from "../pages/usuario/favorites/favorites.module";
import { HomePageModule } from "../pages/usuario/home/home.module";
import { LinksPageModule } from "../pages/usuario/links/links.module";
import { LoginPageModule } from "../pages/usuario/login/login.module";
import { NavPageModule } from "../pages/usuario/nav/nav.module";
import {ProfilePageModule} from "../pages/usuario/profile/profile.module";
import {PopOverModule} from "../pages/acervo/book-list/pop-over.module";
import {PopOverDocModule} from "../pages/acervo/doc-list/pop-over-doc.module";
import {SocialSharing} from "@ionic-native/social-sharing";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,
      {
        monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda-feira', 'Rer\u00e7a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayShortNames: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
      }
    ),
    IonicStorageModule.forRoot(),
    BooksPageModule,
    FavoritesPageModule,
    HomePageModule,
    LinksPageModule,
    LoginPageModule,
    NavPageModule,
    ProfilePageModule,
    PopOverModule,
    PopOverDocModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    ApiProvider,
    UtilsProvider,
    SocialSharing,
    InAppBrowser
  ]
})
export class AppModule {}
