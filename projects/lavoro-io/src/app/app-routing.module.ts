import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages/pages.component';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  {
    path:'pages',
    component: PagesComponent,
    children:[
      {
        path: 'test',
        component: TestComponent
      }
    ]
  },
  {
    path:'auth',
    component: AuthComponent,
    children:[
      {
        path:'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
