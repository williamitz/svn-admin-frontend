import { Component } from '@angular/core';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent {

  lista=[
    {
      callstart: '08/31/2022',
      callend: '08/31/2022',
      language: 'Spanish',
      ratexmin: '0.10',
      duration: '16s',
      avg: '19s',
      id: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      client: 'Arenas'
    },
    {
      callstart: '08/31/2022',
      callend: '08/31/2022',
      language: 'Spanish',
      ratexmin: '0.10',
      duration: '16s',
      avg: '19s',
      id: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      client: 'Arenas'
    },
    {
      callstart: '08/31/2022',
      callend: '08/31/2022',
      language: 'Spanish',
      ratexmin: '0.10',
      duration: '16s',
      avg: '19s',
      id: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      client: 'Arenas'
    }
  ];

}
