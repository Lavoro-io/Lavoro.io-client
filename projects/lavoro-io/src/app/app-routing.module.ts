import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages/pages.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestComponent } from './pages/test/test.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    redirectTo: 'pages/home'
  },
  {
    path:'pages',
    component: PagesComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        redirectTo: 'not-found',
        pathMatch: 'full'
      },
      {
        path: 'profile/:uuid',
        component: ProfileComponent,
      },
      {
        path: 'test',
        component: TestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login'
  },
  {
    path:'auth',
    component: AuthComponent,
    children:[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
