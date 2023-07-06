import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { TokenGuard } from 'src/app/guards/token.guard';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [ TokenGuard, AuthGuard ],
    loadChildren: () => import('./admin-layout.routes.module').then( (m) => m.AdminLayoutRoutesModule )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
