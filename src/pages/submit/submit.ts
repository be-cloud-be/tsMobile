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
    tasks : any;

    constructor(public nav: NavController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder, private odoo : OdooProvider) {
      this.timesheet = this.formBuilder.group({
        date: [new Date().toISOString(), Validators.required],
        site: ['', Validators.required],
        task: [{value:'',disabled:true}, Validators.required],
        start: ['07:30'],
        end: ['16:00'],
        pause: ['00:30'],
      });
      this.timesheet.controls.site.valueChanges.subscribe(data => {
          if(data) {
              this.odoo.getTasks(data).then((data : any) => {
                  this.tasks = data.tasks;
                  this.timesheet.get('task').enable();
              });
          } else {
              this.tasks = [];
              this.timesheet.get('task').disable();
          }
      })
      this.odoo.getSites().then((data : any) => this.sites = data.sites);
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
