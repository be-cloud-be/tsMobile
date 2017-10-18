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

  items : any;

  constructor(public nav: NavController, public navParams: NavParams, private odoo : OdooProvider) {
    this.odoo.getList().then((data : any) => this.items = data.items);
  }

  ionSelect() {
        if(!this.odoo.isLoggedIn()) {
          this.nav.setRoot('LoginPage');
        }
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
