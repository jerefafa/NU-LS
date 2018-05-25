import { Component } from '@angular/core';
import {AlertController, App, NavController,LoadingController} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {BookInfoPage} from "../book-info/book-info";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {LoginPage} from "../login/login";
import {SearchPage} from "../search/search";
import {Storage} from "@ionic/storage";
import {Http} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options:BarcodeScannerOptions={};
  id:string;
  constructor(private load:LoadingController,private http:Http,public app:App,private localNotification:LocalNotifications,public navCtrl: NavController,private alertCtrl:AlertController,private Bscanner:BarcodeScanner,private storage:Storage) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('id').then(data=>{
      console.log(data);
    });
    //this.showNotification();
  }
  showNotification():void{
    this.localNotification.schedule({
      id:1,
      text:'Logged In',
      icon:'../imgs/icon.png',

    });
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
          this.app.getRootNav().setRoot(LoginPage);
        }
      },{
        text:'No',
        role:'cancel'
      }]
    });
    alert.present();
  }
  async openScanner(){
    this.options = {
      prompt:"Scan Barcode"
    };
    let loads = this.load.create({
      content:'Please Wait'
    });
    this.Bscanner.scan(this.options).then(barcodeData=>{
      loads.present();
      let postData = new FormData();
      postData.append('barcode',barcodeData.text);
      this.http.post("http://nuls.x10host.com/user-borrow-search.php",postData).map(res=>res.json()).subscribe(res=>{
        if(res.length==0){
          if(barcodeData.text.trim()!="") {
            this.showMessage('Book Barcode does not match any in our library');
          }
          loads.dismissAll();
        }
        else {
          this.navCtrl.push(BookInfoPage,{
            'from':'2',
            'barcode':barcodeData.text,
            'book_title':res[0].title,
            'author':res[0].author,
            'edition':res[0].edition
          });
          loads.dismissAll();
        }
      },error=>{
        console.log(error);
        loads.dismissAll();
      });
    });
  }
  openSearchPage():void{
    this.navCtrl.push(SearchPage);
  }
  swipe(event):void{
    if(event.direction===2){
      this.navCtrl.parent.select(1);
    }
  }
  showMessage(msg:string):void{

    let alert = this.alertCtrl.create({
      title:'Message',
      subTitle:msg,
      buttons:['ok']
    });
    alert.present();
  }
}
