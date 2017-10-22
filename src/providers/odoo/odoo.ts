import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/map';

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

  ItemList : Array<any>;

  Sites : Array<any>;
  Tasks : Array<any>;

  Submission : FormGroup;

  constructor(public http: Http, private formBuilder: FormBuilder) {
    this.Submission = this.formBuilder.group({
      date: [new Date().toISOString(), Validators.required],
      site: ['', Validators.required],
      task: [{value:'',disabled:true}, Validators.required],
      start: ['07:30'],
      end: ['16:00'],
      pause: ['00:30'],
    });
  }

  isLoggedIn() {
      return this.UserCode && this.UserCode != 0;
  }

  setUserCode(userCode: number) {
      return this.jsonRPC('/ts_mobile/check_code',{'userCode' : userCode}).then((data) => {
          this.UserCode = userCode;
          this.UserName = data['name'];
          this.updateList();
          this.updateSites();
      })
  }

  updateSites() {
      return this.jsonRPC('/ts_mobile/sites',{'userCode' : this.UserCode}).then((data : any) => {
          this.Sites = data.sites;
      })
  }

  setSite(site : string) {
      return this.jsonRPC('/ts_mobile/tasks',{'userCode' : this.UserCode, 'site' : site}).then((data: any) => {
          this.Tasks = data.tasks;
      })
  }

  submit() {
      return this.jsonRPC('/ts_mobile/submit',{'userCode' : this.UserCode, 'item' : {
          date: this.Submission.get('date').value,
          site: this.Submission.get('site').value,
          task: this.Submission.get('task').value,
          start: this.Submission.get('start').value,
          end: this.Submission.get('end').value,
          pause: this.Submission.get('pause').value,
      }}).then(() => this.updateList())
  }

  delete(itemId : string) {
      return this.jsonRPC('/ts_mobile/delete',{'userCode' : this.UserCode, 'itemId' : itemId}).then(() => this.updateList())
  }

  updateList() {
      this.jsonRPC('/ts_mobile/list',{'userCode' : this.UserCode}).then((data : any)=>{
          this.ItemList = data.items;
      })
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
