import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  lista=[
    {
      callstart: '08/31/2022 11:59PM',
      callend: '08/31/2022 12:16PM',
      language: 'Spanish',
      ratexmin: 0.30,
      duration: 45,
      avg: 19,
      callid: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      patientname: 'Arenas'
    },
    {
      callstart: '08/31/2022 11:59PM',
      callend: '08/31/2022 12:16PM',
      language: 'Spanish',
      ratexmin: 0.30,
      duration: 25,
      avg: 19,
      callid: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      patientname: 'Arenas'
    },
    {
      callstart: '08/31/2022 11:59PM',
      callend: '08/31/2022 12:16PM',
      language: 'Spanish',
      ratexmin: 0.30,
      duration: 60,
      avg: 19,
      callid: '5FF57B70F0',
      location: 'Emergency',
      mrn: 200025487,
      patientname: 'Arenas'
    }
  ];

}
