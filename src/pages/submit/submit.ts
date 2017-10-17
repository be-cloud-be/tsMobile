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
    siteSelected : boolean;
    tasks : any;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder, private odoo : OdooProvider) {
      this.timesheet = this.formBuilder.group({
        date: [new Date().toISOString(), Validators.required],
        site: ['', Validators.required],
        task: [{value:'',disabled:true}, Validators.required],
        start: ['07:30'],
        end: ['16:30'],
        pause: ['00:30'],
      });
      this.timesheet.valueChanges.subscribe(data => {
          if(data.site) {
              this.odoo.getTasks(data.site).then((data : any) => {
                  this.tasks = data.tasks;
                  this.siteSelected = true;
              });
          } else {
              this.tasks = [];
              this.siteSelected = false;
          }
      })
      this.siteSelected = false;
      this.odoo.getSites().then((data : any) => this.sites = data.sites);
    };

    onchange_site(event: any) {
        console.log(event);
    };

    logForm() {

      if(this.timesheet.valid){
        // (optional) show a message to your users while you are verifying the passcode
        let loader = this.loadingCtrl.create({ content: 'Submitting the timesheet', dismissOnPageChange: true });
        loader.present();
        // (optional) show a message to your users while you are verifying the passcode
        return this.odoo.submit({
            date: this.timesheet.get('date').value,
            site: this.timesheet.get('site').value,
            task: this.timesheet.get('task').value,
            start: this.timesheet.get('start').value,
            end: this.timesheet.get('end').value,
            pause: this.timesheet.get('pause').value,
        }).then((data) => {
            loader.dismiss();
            loader = this.loadingCtrl.create({ content: 'Timesheet sent', dismissOnPageChange: true });
            loader.present();
            setTimeout(() => {loader.dismiss();}, 500);
        });

        };
    };

}
