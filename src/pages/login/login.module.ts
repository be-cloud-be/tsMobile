import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { IonPasscode } from '../../components/ion-passcode';

@NgModule({
  declarations: [
    LoginPage,
    IonPasscode,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
