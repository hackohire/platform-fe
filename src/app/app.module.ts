import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AmplifyAngularModule
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
