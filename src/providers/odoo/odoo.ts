import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

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
        var body = '{"jsonrpc":"2.0","method": "sites","params": [],"id": "1"}';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .post(this.OdooURL+'/sites', body, { headers: headers })
            .map(response => response.json())
            .subscribe(data => {
              console.log(data);
              resolve(data);
          });
      });
    }
}
