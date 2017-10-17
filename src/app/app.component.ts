import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from '../pages/login/login';

import moment from "moment";
import "moment/src/locale/fr";

@Component({
  templateUrl: 'app.html'
})
export class TSMobile {
  rootPage:any = LoginPage;

  constructor(config: Config, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      translateService.setDefaultLang('fr');
      moment.locale('fr');
      config.set('monthNames', moment.months())
      config.set('monthShortNames', moment.monthsShort())
      config.set('dayNames', moment.weekdays())
      config.set('dayShortNames', moment.weekdaysShort())
    });
  }
}
