import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OfficeDesignModule } from 'office-design';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages/pages.component';
import { TestComponent } from './pages/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OfficeDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
