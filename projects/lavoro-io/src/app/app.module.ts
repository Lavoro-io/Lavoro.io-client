import { Injectable, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { OfficeDesignModule } from 'office-design';
import { UserService } from 'projects/lavoro-io/src/app/services/user.service';

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
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SettingsComponent } from './pages/settings/settings.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { MessagesComponent } from './pages/messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    //TestComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    SettingsComponent,
    ContactsComponent,
    MessagesComponent
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    }),
    BrowserModule,
    AppRoutingModule,
    OfficeDesignModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    JwtHelperService,
    UserService, 
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

export function getToken():any {
  return localStorage.getItem('token');
}

// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   constructor(private readonly injector: Injector) {}

//   public intercept(req: HttpRequest<any>, next: HttpHandler): any {
//     try {
//       const translateService = this.injector.get(TranslateService)
//       // log using translate service
//     } catch {
//       // log without translation translation service is not yet available
//     }
//   }
// }