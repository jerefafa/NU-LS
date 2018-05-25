import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {NotificationPage} from "../notification/notification";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root =  NotificationPage;


  constructor() {

  }

}
