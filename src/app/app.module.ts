import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TSMobile } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { IonPasscode } from '../components/ion-passcode';

@NgModule({
  declarations: [
    TSMobile,
    IonPasscode,
    LoginPage,
    HomePage,
    IonPasscode
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TSMobile)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TSMobile,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
