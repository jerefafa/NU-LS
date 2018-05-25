import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the BookInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html',
})
export class BookInfoPage {
  fromWhere:string;
  bookTitle:string;
  author:string;
  edition:string;
  barcode:string;
  book_id:string;
  availability:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private  alertCtrl:AlertController,private http:Http) {
  this.fromWhere = this.navParams.get('from');
  this.bookTitle = this.navParams.get('book_title');
  this.author = this.navParams.get('author');
  this.edition = this.navParams.get('edition');
  this.barcode = this.navParams.get('barcode');
  this.book_id = this.navParams.get('book_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookInfoPage');
    let postData = new  FormData();
    postData.append('book_id',this.book_id);
    this.http.post("http://nuls.x10host.com/check-availability-api.php",postData).map(res=>res.json()).subscribe(res=>{

      this.availability = res;
      console.log(this.availability);
    });
  }
  showBorrowed():void{
    let alert = this.alertCtrl.create({
      title:'Message:',
      subTitle:'Book Borrowed \n Please Return this book on or before: April 4 2018',
      buttons:['Ok']
    });
    alert.present();
  }
  Borrow(){
    let alert = this.alertCtrl.create({
      title:'Confirmation',
      subTitle:'Are you sure you want to borrow this book?',
      buttons:[{
        text:'Yes',
        handler:()=>{
          this.showBorrowed();
        }
      },{
        text:'No',
        handler:()=>{

        }
      }]
    });
    alert.present();
  }
}
