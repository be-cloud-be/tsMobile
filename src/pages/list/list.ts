import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { OdooProvider, ISubmission } from '../../providers/odoo/odoo';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private odoo : OdooProvider) {
      this.odoo.getList().then((data : any) => this.items = data.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
