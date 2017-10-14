import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TSMobile } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    TSMobile,
    LoginPageModule,
    HomePageModule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TSMobile)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TSMobile,
    LoginPageModule,
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
