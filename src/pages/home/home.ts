import { Component } from '@angular/core';
import { IonicPage , NavController} from 'ionic-angular';

import { SubmitPage } from '../submit/submit';
import { ListPage } from '../list/list';
import { OdooProvider } from '../../providers/odoo/odoo';

@IonicPage({
    name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    tab1Root = SubmitPage;
    tab2Root = ListPage;

    constructor(public nav: NavController, private odoo : OdooProvider) {
    }

    ionViewCanEnter() {
        if(!this.odoo.isLoggedIn()) {
          this.nav.setRoot('LoginPage');
        }
    }

}
