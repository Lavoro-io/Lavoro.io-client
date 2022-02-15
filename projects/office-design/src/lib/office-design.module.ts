import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { OfficeDesignComponent } from './office-design.component';



@NgModule({
  declarations: [
    OfficeDesignComponent,
    ButtonComponent
  ],
  imports: [
  ],
  exports: [
    OfficeDesignComponent,
    ButtonComponent
  ]
})
export class OfficeDesignModule { }
