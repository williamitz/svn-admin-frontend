import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpreterServicesComponent } from './interpreter-services/interpreter-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterpreterFilesComponent } from './interpreter-files/interpreter-files.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    InterpreterServicesComponent,
    InterpreterFilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [
    InterpreterServicesComponent,
    InterpreterFilesComponent
  ]
})
export class SharedAdminModule { }
