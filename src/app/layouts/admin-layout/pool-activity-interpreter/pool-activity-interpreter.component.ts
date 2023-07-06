import { Component } from '@angular/core';

@Component({
  selector: 'app-pool-activity-interpreter',
  templateUrl: './pool-activity-interpreter.component.html',
  styleUrls: ['./pool-activity-interpreter.component.scss']
})
export class PoolActivityInterpreterComponent {

  lista = [
    {
      name: 'Timothy Smith',
      client: 'Huston Hospital',
      idinterpreter: '12345',
      rate: '0010',
      avg: '10s',
      duration: '15m'
    },
    {
      name: 'Alejandra Neal',
      client: 'Huston Hospital',
      idinterpreter: '12345',
      rate: '0010',
      avg: '10s',
      duration: '15m'
    }
  ]

}
