import { Component } from '@angular/core';

@Component({
  selector: 'app-call-queues',
  templateUrl: './call-queues.component.html',
  styleUrls: ['./call-queues.component.scss']
})
export class CallQueuesComponent {

  lista=[
    {
      phonenumber: '159753852',
      ratexmin: '0.10',
      language: 'English <> Spanish',
    },
    {
      phonenumber: '159753852',
      ratexmin: '0.10',
      language: 'English <> Cantonese',
    },
    {
      phonenumber: '159753852',
      ratexmin: '0.10',
      language: 'English <> Spanish',
    }
  ];

}
