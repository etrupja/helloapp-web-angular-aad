import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {MsalModule} from '@azure/msal-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      auth:{
        clientId:"7b77a949-ce8d-4690-b5f2-b7358b1356fa",
        authority:"https://login.microsoftonline.com/c87b3ee5-2509-4069-a3f6-ccaca5b30158/",
        validateAuthority: true,
        redirectUri:"http://localhost:4200/"
      },
      cache:{
        cacheLocation:"sessionStorage",
        storeAuthStateInCookie: false
      }
    },{
      consentScopes:[
        "user.read","openid","profile"
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
