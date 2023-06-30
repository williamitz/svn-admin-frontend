import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CallLayoutComponent } from './call-layout.component';
import { TokenGuard } from 'src/app/guards/token.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'calls',
    // canActivate: [ TokenGuard, AuthGuard ],
    component: CallLayoutComponent,
    loadChildren: () => import('./call-layout.routes.module').then( (m) => m.CallLayoutRoutesModule )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallLayoutRoutingModule {}
