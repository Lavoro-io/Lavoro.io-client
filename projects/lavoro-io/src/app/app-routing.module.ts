import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
