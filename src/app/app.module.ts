import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppPreferences } from '@ionic-native/app-preferences';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { TSMobile } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { SubmitPageModule } from '../pages/submit/submit.module';
import { ListPageModule } from '../pages/list/list.module';
import { OdooProvider } from '../providers/odoo/odoo';

@NgModule({
  declarations: [
    TSMobile
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TSMobile, OdooProvider),
    HttpModule,
    LoginPageModule,
    HomePageModule,
    SubmitPageModule,
    ListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TSMobile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppPreferences,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OdooProvider
  ]
})
export class AppModule {}
