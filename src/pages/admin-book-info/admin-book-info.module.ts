import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBookInfoPage } from './admin-book-info';

@NgModule({
  declarations: [
    AdminBookInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminBookInfoPage),
  ],
})
export class AdminBookInfoPageModule {}
