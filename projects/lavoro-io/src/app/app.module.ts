import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { OfficeDesignModule } from 'office-design';
import { AppManagerService } from 'projects/lavoro-io/src/app/services/app-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages/pages.component';
import { TestComponent } from './pages/test/test.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    TestComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OfficeDesignModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({})
  ],
  providers: [
    AppManagerService, 
    AuthService,
    AuthGuardService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
