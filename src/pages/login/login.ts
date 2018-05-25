import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AdminTabsPage} from "../admin-tabs/admin-tabs";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string="";
  password:string="";
  isConnected:boolean=navigator.onLine;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,public http:Http,private loadingCtrl:LoadingController,private storage:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }



  showErrorMessage(message:string){
    let alert = this.alertCtrl.create({
      title:"Message",
      subTitle:message,
      buttons:['ok']
    });
    alert.present();
  }
  Login(){
    this.LoginUser();


  }

  LoginUser(){
      if(this.username.trim()!="" && this.password.trim() !="") {
      this.isConnected = navigator.onLine;
      if(this.isConnected==true) {
        let loading = this.loadingCtrl.create({
          content:'Logging in',
        });
        loading.present();
        let postData = new FormData();
        postData.append('username',this.username);
        postData.append('password',this.password);
        this.http.post("http://nuls.x10host.com/mobile-app-login.php",postData).timeout(5000).map(res => res.json()).subscribe(res => {
          console.log(res);
          if(res.length==0){
            console.log('No result');
            loading.dismissAll();
            this.showErrorMessage('Invalid Username and/or password');
          }
          else{
            loading.dismissAll();
            if(res.librarian_id==undefined){
              this.storage.set('id',res.user_id);
              this.storage.set('user_type','user');
              this.navCtrl.setRoot(TabsPage);

            }
            else {
              this.storage.set('id',res.librarian_id);
              this.storage.set('user_type','librarian');
              this.navCtrl.setRoot(AdminTabsPage);
            }
          }
        },err=>{
          this.showErrorMessage('Network Problem');
          console.log(err);
          loading.dismissAll();
        });
      }
      else {
        this.showErrorMessage('No Internet Connection');
      }
    }
    else {
      this.showErrorMessage("All fields must be filled up");
    }

  }



}
