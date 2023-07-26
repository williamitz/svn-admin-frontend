import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-interprter',
  templateUrl: './portal-interprter.component.html',
  styleUrls: ['./portal-interprter.component.scss']
})
export class PortalInterprterComponent {

  lista=[
    {
      calltype: 'Phone Call',
      ratexmin: '0.10',
      connectiontime: '0',
      duration: '02:00'
    },
    {
      calltype: 'Phone Call',
      ratexmin: '0.10',
      connectiontime: '0',
      duration: '02:00'
    },
    {
      calltype: 'Phone Call',
      ratexmin: 'Por0.10',
      connectiontime: '0',
      duration: '02:00'
    }
  ];

  listaOpi = [
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    },
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    },
    {
      date: '08/31/2022',
      ratexhour: '0.30',
      ratexmin: '0.10',
      calltype: 'OPI',
    }
  ]


  listaOnsite = [
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    },
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    },
    {
      assignmenttype: 'type',
      date: '08/31/2022',
      assignmentaddress: 'Av. Velzon #123',
      name: 'Timothy Smith',
      email: 'smith@gmail.com',
      numberphone: '987325416',
      interpreter: 'José Lopez',
      id: '123456',
      comment: 'lorem ipsum '
    }
  ]

  profileRating = 5;

}
