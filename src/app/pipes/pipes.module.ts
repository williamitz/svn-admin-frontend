import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';


@NgModule({
  exports: [
    StatusPipe
  ],
  declarations: [
    StatusPipe
  ],
})
export class PipesModule { }
