import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OfficeDesignModule } from 'office-design';
import { AppManagerService } from 'projects/lavoro-io/services/app-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages/pages.component';
import { TestComponent } from './pages/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    TestComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OfficeDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
