import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CallLayoutComponent } from './call-layout.component';

const routes: Routes = [
  {
    path: 'calls',
    component: CallLayoutComponent,
    loadChildren: () => import('./call-layout.routes.module').then( (m) => m.CallLayoutRoutesModule )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallLayoutRoutingModule {}
