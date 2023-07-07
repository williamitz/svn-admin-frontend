import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {

  lista=[
    {
      customer: 'Houston Hospital',
      account: 'Telehealth',
      accesscode: 854676,
      phonenumber: 998542179
    },
    {
      customer: 'Houston Hospital',
      account: 'Telehealth',
      accesscode: 1237946,
      phonenumber: 948542179
    },
    {
      customer: 'Houston Hospital',
      account: 'Telehealth',
      accesscode: 357468,
      phonenumber: 928542179
    }
  ];

}
