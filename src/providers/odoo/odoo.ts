import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

import 'rxjs/add/operator/map';

export interface ISubmission {
    date: Date,
    site: string,
    start: string,
    end: string,
    pause: string,
}

/*
  Generated class for the OdooProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OdooProvider {

  UserCode : number;
  UserName : string;

  OdooURL = 'https://socoma.imply.lu';

  constructor(public http: Http) {
  }

  setUserCode(userCode: number) {
      this.jsonRPC('/check_code',{'userCode' : userCode}).then((data) => {
          this.UserCode = userCode;
          this.UserName = data['name'];
      });
  }

  getSites() {
      return this.jsonRPC('/sites',{'userCode' : this.UserCode})
  }

  submit(item : ISubmission) {
      console.log('Submit : ',item);
  }

  private jsonRPC(endpoint: string, params: any) {
        return new Promise((resolve,reject) => {
          var body = {
              "jsonrpc":"2.0",
              "params": params
          };
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');

          this.http
              .post(this.OdooURL+endpoint, JSON.stringify(body), { headers: headers })
              .map(response => response.json())
              .subscribe(data => {
                console.log(data);
                if(data.error) {
                    reject(data.error.data);
                } else {
                    resolve(data.result);
                }
            });
        });
    }
}
