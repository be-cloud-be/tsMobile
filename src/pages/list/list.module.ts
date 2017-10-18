import { NgModule } from '@angular/core';
import { IonicPageModule, List } from 'ionic-angular';
import { ListPage } from './list';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    MomentModule,
    List,
  ],
})
export class ListPageModule {}
