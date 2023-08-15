import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortalInterprterComponent } from './portal-interprter/portal-interprter.component';
import { MyassignmetInterpreterComponent } from './myassignmet-interpreter/myassignmet-interpreter.component';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { CallHistoryInterpreterComponent } from './call-history-interpreter/call-history-interpreter.component';
import { ProfileInterpreterComponent } from '../admin-layout/profile-interpreter/profile-interpreter.component';

const routes: Routes = [
  { path: '', component: PortalInterprterComponent },
  { path: 'my-assignments', component: MyassignmetInterpreterComponent },
  { path: 'call-history', component: CallHistoryInterpreterComponent },
  { path: 'profile', component: ProfileInterpreterComponent },

  { path: '**', component: NotFoundPageComponent },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesLayoutRoutesModule {}
