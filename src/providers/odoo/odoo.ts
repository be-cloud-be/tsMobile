import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the OdooProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OdooProvider {

  UserCode : number;

  OdooURL : 'https://socoma.imply.lu';

  constructor(public http: Http) {
  }

  setUserCode(userCode: number) {
      this.UserCode = userCode
  }

  getSites() {
      console.log('getSites for user '+this.UserCode)
      return new Promise(resolve => {

        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get(this.OdooURL+'/sites')
          .map(res => res.json())
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            resolve(data);
          });
        });
    }
}
