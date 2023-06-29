import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})

export class StatusPipe implements PipeTransform {
  transform(status: boolean): any {

    return status ? 'Activo' : 'Inactivo';

  }
}
