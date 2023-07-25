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
      phonenumber: 998542179,
      rating: 5
    },
    {
      customer: 'Houston Hospital',
      account: 'Telehealth',
      accesscode: 1237946,
      phonenumber: 948542179,
      rating: 4
    },
    {
      customer: 'Houston Hospital',
      account: 'Telehealth',
      accesscode: 357468,
      phonenumber: 928542179,
      rating: 5
    }
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
