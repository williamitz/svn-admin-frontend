import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpreterServicesComponent } from './interpreter-services/interpreter-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InterpreterServicesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InterpreterServicesComponent
  ]
})
export class SharedAdminModule { }
