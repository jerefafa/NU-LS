import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Camera,CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the AdminBookInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-book-info',
  templateUrl: 'admin-book-info.html',
})
export class AdminBookInfoPage {
  options:BarcodeScannerOptions;

  constructor(private camera:Camera,public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private BScanner:BarcodeScanner) {

  }
  cameraOptions:CameraOptions={
    quality:100,
    destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminBookInfoPage');
  }
  showCirculation():void{
    let alert = this.alertCtrl.create({
      title:'Student Number',
      inputs:[{
        name:'idNum',
        placeholder:'ID Number',
        type:'number'
      }],
      buttons:[{
        text:'Lend',
        handler:()=>{
          this.showLend();
        }
      },
        {
          text:'Return',
          handler:()=>{
            this.showReturn();
          }
        },{
          text:'Cancel',
          role:'cancel',
          handler:()=>{

          }
        }]
    });
    alert.present();
  }
  //Lending Method
  showLend():void{
    let alert = this.alertCtrl.create({
      title:'Remarks',
      subTitle:'Book Lent',
      buttons:['ok']
    });
    alert.present();
  }
  showReturn():void{
    let alert = this.alertCtrl.create({
      title:'Remarks',
      subTitle:'Book Returned',
      buttons:['ok']
    });
    alert.present();
  }
  async openScanner(){
    this.options = {
      prompt:"Scan Barcode"
    };
    this.BScanner.scan(this.options).then(barcodeData=>{
      let alert = this.alertCtrl.create({
        title:'Barcode Data',
        subTitle:barcodeData.text,
        buttons:['Ok']
      });
      alert.present();
      this.navCtrl.push(AdminBookInfoPage);
    });
  }

  showRemarks(): void
  {
    let prompt = this.alertCtrl.create({
      title: 'Book Remarks',
      message: 'Select Remarks ',
      inputs : [
        {
          type:'radio',
          label:'Dilapidated',
          value:'Dilapidated'
        },
        {
          type:'radio',
          label:'For Covering',
          value:'For Covering'
        },
        {
          type:'radio',
          label:'Weed Out',
          value:'Weed Out'
        },
        {
          type:'radio',
          label:'Missing Page',
          value:'Missing page'
        },
        {
          type:'radio',
          label:'Deselected',
          value:'Deselected'
        }
        ],
      buttons : [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            console.log("search clicked");
          }
        }]});
    prompt.present();
  }
  openCamera(){
    this.camera.getPicture(this.cameraOptions).then((imageData=>{

    }))
  }

}
