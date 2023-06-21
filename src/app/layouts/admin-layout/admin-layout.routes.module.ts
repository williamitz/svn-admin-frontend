import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientPageComponent } from './client-page/client-page.component';

// TODO: crear rutas
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'clients', component: ClientPageComponent },
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutesModule {}
