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

  OdooURL = 'https://socoma.imply.lu';

  constructor(public http: Http) {
  }

  setUserCode(userCode: number) {
      this.UserCode = userCode
  }

  getSites() {
      return new Promise(resolve => {
        console.log(this.OdooURL+'/sites');
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.post(this.OdooURL+'/sites','{"jsonrpc": "2.0", "method": "sites", "params" : []}')
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            resolve(data);
          });
        });
    }
}
