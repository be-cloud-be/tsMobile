import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController } from 'ionic-angular';
import { IonPasscodeOptions } from '../../components/ion-passcode';
import { OdooProvider } from '../../providers/odoo/odoo';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    passcodeOptions: IonPasscodeOptions;

    constructor(public loadingCtrl: LoadingController, private nav: NavController, private odoo : OdooProvider) { }

    ngOnInit() {

      let _t = this; // keeping a reference to `this`

      this.passcodeOptions = {
        title: 'Enter Passcode',
        onComplete: function(passcode: string) {

          // (optional) show a message to your users while you are verifying the passcode
          let loader = _t.loadingCtrl.create({ content: 'Checking passcode', dismissOnPageChange: true });
          loader.present();

          // you have to return a promise once you have verified the passcode
          // if the passcode is invalid call `reject()`
          // if the passcode is valid call `resolve()`
          return new Promise((resolve, reject) => {
            // the timeout is here to simulate the verifying process
            setTimeout(() => {
              loader.dismiss();
              if (passcode == '1234') {
                  _t.odoo.setUserCode(Number(passcode));
                  _t.nav.setRoot('HomePage');
              }
              else {
                  _t.nav.setRoot('LoginPage');
              }
          }, 500);
          });
        }
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
