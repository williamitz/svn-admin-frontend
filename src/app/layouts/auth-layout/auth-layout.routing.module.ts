import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundPageComponent } from '../../pages/not-found-page/not-found-page.component';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginToInterpreterComponent } from './login-to-interpreter/login-to-interpreter.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';
import { AuthSuccessComponent } from './auth-success/auth-success.component';

const _authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-to-interpreter',
    component: LoginToInterpreterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'success',
    component: AuthSuccessComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },

];

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: _authRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule {}
