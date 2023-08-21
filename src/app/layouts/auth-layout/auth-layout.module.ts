import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthLayoutRoutingModule } from './auth-layout.routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginToInterpreterComponent } from './login-to-interpreter/login-to-interpreter.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthSuccessComponent } from './auth-success/auth-success.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    LoginToInterpreterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutRoutingModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutModule { }
