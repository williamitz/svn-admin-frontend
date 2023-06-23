import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallLayoutRoutesModule {}
