import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
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

    constructor(public nav: NavController, public loadingCtrl: LoadingController, private odoo : OdooProvider) {
      this.odoo.Submission.controls.site.valueChanges.subscribe(data => {
          if(data) {
              this.odoo.setSite(data).then(() => {
                  this.odoo.Submission.get('task').enable();
              });
          } else {
              this.odoo.Submission.get('task').disable();
          }
      })
    };

    logForm() {

      if(this.odoo.Submission.valid){
        // (optional) show a message to your users while you are verifying the passcode
        let loader = this.loadingCtrl.create({ content: 'Submitting the timesheet', dismissOnPageChange: true });
        loader.present();
        // (optional) show a message to your users while you are verifying the passcode
        return this.odoo.submit().then((data) => {
            loader.dismiss();
            loader = this.loadingCtrl.create({ content: 'Timesheet sent', dismissOnPageChange: true });
            loader.present();
            setTimeout(() => {loader.dismiss();}, 500);
        });

        };
    };

}
