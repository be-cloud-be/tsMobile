import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';

import { LoadingController, IonicPage, NavController } from 'ionic-angular';


@IonicPage({
    name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timesheet : FormGroup;

  sites = [
    { id: 'bissen', name : 'Bissen' },
    { id: 'mamer', name : 'Mamer'},
    { id: 'jalhay', name : 'Jalhay'}
  ];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.timesheet = this.formBuilder.group({
      date: [new Date().toISOString(), Validators.required],
      site: ['', Validators.required],
      start: ['7:30'],
      end: ['16:30'],
      pause: ['00:30'],
    });
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
