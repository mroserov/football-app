import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material.module";
import {ViewsModule} from "./shared/views.module";
import {HeadersInterceptor} from "./core/interceptors/headers.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ViewsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: ErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
