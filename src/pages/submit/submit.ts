import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OdooProvider } from '../../providers/odoo/odoo';

/**
 * Generated class for the SubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage({
   name: 'SubmitPage'
 })
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {

    timesheet : FormGroup;

    sites : any;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder, private odoo : OdooProvider) {
      this.timesheet = this.formBuilder.group({
        date: [new Date().toISOString(), Validators.required],
        site: ['', Validators.required],
        start: ['07:30'],
        end: ['16:30'],
        pause: ['00:30'],
      });
      this.odoo.getSites().then((data : any) => this.sites = data.sites);
    };

    logForm() {
      if(this.timesheet.valid){
        // (optional) show a message to your users while you are verifying the passcode
        let loader = this.loadingCtrl.create({ content: 'Pointage envoyé : ' + JSON.stringify(this.timesheet.value), dismissOnPageChange: true });
        loader.present();
        setTimeout(() => {
          loader.dismiss();
        }, 2000);
      }
    }

}
