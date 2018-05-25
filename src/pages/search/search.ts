import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BookInfoPage} from "../book-info/book-info";
import {Http} from "@angular/http";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  books:any[];
  keyword:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  openBookInfo(book_id:string,book_title:string,author:string,edition:string){
    console.log(book_id);
    this.navCtrl.push(BookInfoPage,{
      'from':'1',
      'book_id':book_id,
      'book_title':book_title,
      'author':author,
      'edition':edition
    });
  }
  search(key){
    let postData = new FormData();
    postData.append('keyword',this.keyword);
    this.http.post("http://nuls.x10host.com/search-api.php",postData).map(res=>res.json()).subscribe(res=>{
      this.books = res;
    },error=>{
      console.log(error);
    });
  }
}
