import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-user',
  templateUrl: './internal-user.component.html',
  styleUrls: ['./internal-user.component.scss']
})
export class InternalUserComponent {

  lista=[
    {
      firstname: 'Alejandra',
      lastname: 'Neal',
      rol: 'rol 1',
      customertype: 'Certifications',
      accesscode: '852456'
    },
    {
      firstname: 'Timothy',
      lastname: 'Smith',
      rol: 'rol 2',
      customertype: 'Educational',
      accesscode: '753951'
    },
    {
      firstname: 'Javier ',
      lastname: 'Savedra',
      rol: 'rol 1',
      customertype: 'Certifications',
      accesscode: '951357'
    }
  ];

}
