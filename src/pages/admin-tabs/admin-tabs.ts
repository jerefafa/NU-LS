import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {AdminBookInfoPage} from "../admin-book-info/admin-book-info";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AdminTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-tabs',
  templateUrl: 'admin-tabs.html',
})
export class AdminTabsPage {
  options:BarcodeScannerOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Bscanner:BarcodeScanner,private alertCtrl:AlertController,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTabsPage');
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
      if(barcodeData.text.trim()!=""){
        this.openBookInfo();
      }
    });
  }
  async Inventory(){
    this.options = {
      prompt:"Scan Barcode"
    };
    this.Bscanner.scan(this.options).then(barcodeData=>{
      if(barcodeData.text.trim()!=""){
        this.Inventory();
      }
    });
  }
  openBookInfo(){
    this.navCtrl.push(AdminBookInfoPage);
  }

  Logout():void{
    let alert = this.alertCtrl.create({
      title:'Logout',
      subTitle:'Do you really want to Logout?',
      buttons:[{
        text:'Yes',
        handler:()=>{
          this.storage.remove('id');
          this.storage.remove('user_type');
          this.navCtrl.setRoot(LoginPage);

        }
      },{
        text:'No',
        role:'cancel'
      }]
    });
    alert.present();
  }

}
