import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OdooProvider, ISubmission } from '../../providers/odoo/odoo';

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
        this.odoo.submit({
            date: this.timesheet.get('date').value,
            site: this.timesheet.get('site').value,
            start: this.timesheet.get('start').value,
            end: this.timesheet.get('end').value,
            pause: this.timesheet.get('pause').value,
        })

      }
    }

}
