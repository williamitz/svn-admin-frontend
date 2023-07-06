import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  lista=[
    {
      customer: 'Alejandra Neal	',
      country: 'EE.UU',
      customertype: 'Certifications',
    },
    {
      customer: 'Timothy Smith	',
      country: 'Canada',
      customertype: 'Educational',
    },
    {
      customer: 'Javier Savedra',
      country: 'Portugal',
      customertype: 'Certifications',
    }
  ];

}
