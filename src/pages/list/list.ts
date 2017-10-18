import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ListPage'
})
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public nav: NavController, public navParams: NavParams, private odoo : OdooProvider) {
  }

  duplicateItem(id : string){
      console.log('duplicateItem : '+this.nav.getViews());
      this.odoo.ItemList[id];
  }
}
