import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccessLayoutComponent } from './access-layout.component';
import { TokenGuard } from 'src/app/guards/token.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: 'access-interpreter',
    canActivate: [ TokenGuard, AuthGuard ],
    component: AccessLayoutComponent,
    loadChildren: () => import('./access-layout.routes.module').then( (m) => m.AccesLayoutRoutesModule )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessLayoutRoutingModule {}
