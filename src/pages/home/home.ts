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

    tab1Root = ListPage;
    tab2Root = SubmitPage;

    constructor(public nav: NavController, private odoo : OdooProvider) {
    }

    ionViewWillEnter() {
        if(!this.odoo.isLoggedIn()) {
          this.nav.setRoot('LoginPage');
        }
    }

    checkLoggedIn() {
        if(!this.odoo.isLoggedIn()) {
          this.nav.setRoot('LoginPage');
        }
    }

}
