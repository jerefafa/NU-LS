import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {AdminTabsPage} from "../pages/admin-tabs/admin-tabs";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storage:Storage) {
    storage.get('user_type').then(data=>{
      if(data=="librarian"){
        this.rootPage=AdminTabsPage;
        console.log(data);

      }
      else if(data=="user"){
        this.rootPage=TabsPage;
        console.log(data);
      }
      else{
        this.rootPage=LoginPage;
        console.log(data);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
