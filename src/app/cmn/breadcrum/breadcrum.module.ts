import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';



@NgModule({
  declarations: [BreadcrumComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumComponent
  ]
})
export class BreadcrumModule { }
