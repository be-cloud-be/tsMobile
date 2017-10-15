import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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

}
