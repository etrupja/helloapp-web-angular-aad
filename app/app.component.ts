import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_ENDPOINT = "https://localhost:44326/hello";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showResponse: boolean = false;
  responseTxt: string = '';
  responseOk: boolean = false;

  constructor(private _authService: MsalService, private _http: HttpClient){}

  showMessage() {
      this._authService.loginPopup().then(result => {
        
        this._authService.acquireTokenSilent({
          scopes:["api://c6aeddf3-e9c3-466e-b262-f79ea95a2f3d/access_user_data"]
        }).then((result:any) => {
            this._http.get(API_ENDPOINT, {
              responseType:'text',
              headers: new HttpHeaders({
                'Authorization':'Bearer '+result.accessToken
              })
            }).subscribe((result) => {
              this.responseTxt = result;
              this.showResponse = true;
              this.responseOk = true;
            }, error => {
              this.responseTxt = "Something went wrong";
              this.showResponse = false;
              this.responseOk = false;
            })
        })

      }).catch(error => {
        console.log("Error - ", error);
      })
  }
}
