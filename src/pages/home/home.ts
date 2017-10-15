import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { SubmitPage } from '../submit/submit';
import { ListPage } from '../list/list';


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

    loginParams : any;

    constructor(navParams: NavParams) {
        console.log('Passed params', navParams.data);
        this.loginParams = navParams.data;
    }

}
