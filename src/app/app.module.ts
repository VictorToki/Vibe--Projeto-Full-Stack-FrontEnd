import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app.routes";

@NgModule({
  imports:      [ 
    BrowserModule,
    AppComponent,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    
  ],
  exports: [
    CommonModule
  ],
  providers: [ HttpClientModule ],
  declarations: [  ],
  bootstrap:    [  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }