import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {BookInfoPage} from "../book-info/book-info";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  options:BarcodeScannerOptions={};

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,private Bscanner:BarcodeScanner,private alertCtrl:AlertController,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  swipe(event):void{
    if(event.direction===4){
      this.navCtrl.parent.select(0);
    }
  }
  async openScanner(){
    this.options = {
      prompt:"Scan Barcode"
    };
    this.Bscanner.scan(this.options).then(barcodeData=>{
      let alert = this.alertCtrl.create({
        title:'Barcode Data',
        subTitle:barcodeData.text,
        buttons:['Ok']
      });
      alert.present();
      this.navCtrl.push(BookInfoPage);
    });
  }
  Logout():void{
    let alert = this.alertCtrl.create({
      title:'Logout',
      subTitle:'Do you really want to Logout?',
      buttons:[{
        text:'Yes',
        handler:()=>{
          this.storage.remove('user_type');
          this.storage.remove('id');
          this.app.getRootNav().setRoot(LoginPage);

        }
      },{
        text:'No',
        role:'cancel'
      }]
    });
    alert.present();
  }
}
