import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRouting } from './principal-routing.module';
import { PrincipalListComponent } from './components/principal-list/principal-list.component';
import { PrincipalDetailsComponent } from './components/principal-details/principal-details.component';
import { PrincipalDetailsEditComponent } from './components/principal-details-edit/principal-details-edit.component';



@NgModule({
  declarations: [
    PrincipalListComponent,
    PrincipalDetailsComponent,
    PrincipalDetailsEditComponent
  ],
  imports: [
    CommonModule, PrincipalRouting
  ]
})
export class PrincipalModule { }
