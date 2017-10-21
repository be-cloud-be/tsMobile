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
      let item = this.odoo.ItemList[id];
      this.odoo.Submission.setValue({
          date: new Date().toISOString(),
          site: item.site,
          task: item.task,
          start: item.start,
          end: item.end,
          pause: item.pause
      });
      this.nav.setRoot('SubmitPage');
  }
}
