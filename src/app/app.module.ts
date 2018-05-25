import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {NotificationPage} from "../pages/notification/notification";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BookInfoPage} from "../pages/book-info/book-info";
import {AdminTabsPage} from "../pages/admin-tabs/admin-tabs";
import {AdminBookInfoPage} from "../pages/admin-book-info/admin-book-info";
import {HttpModule} from "@angular/http";
import {Camera} from "@ionic-native/camera";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Network} from "@ionic-native/network";
import {SearchPage} from "../pages/search/search";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [ MyApp,
    HomePage,
    LoginPage,
    NotificationPage,
    BookInfoPage,
    SearchPage,
    TabsPage,
    AdminTabsPage,
    AdminBookInfoPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NotificationPage,
    BookInfoPage,
    TabsPage,
    SearchPage,
    AdminTabsPage,
    AdminBookInfoPage
  ],
  providers: [
    StatusBar,
    LocalNotifications,
    SplashScreen,
    BarcodeScanner,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
