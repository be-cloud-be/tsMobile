import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';
import { ItemSliding } from 'ionic-angular';

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

  duplicateItem(slidingItem : ItemSliding, id : string){
      let item = this.odoo.ItemList.filter(item => item.id == id)[0]
      this.odoo.Submission.patchValue({
          date: new Date().toISOString(),
          site: item.project_id[0],
          start: item.mts_start,
          end: item.mts_end,
          pause: item.mts_pause
      });
      this.odoo.setSite(item.project_id[0]);
      this.odoo.Submission.patchValue({
          task: item.task_id[0]
      });
      this.odoo.Submission.get('task').enable();
      this.nav.parent.select(1);
      slidingItem.close();
  }

  deleteItem(slidingItem : ItemSliding, id : string){
      this.odoo.delete(id);
  }
}
