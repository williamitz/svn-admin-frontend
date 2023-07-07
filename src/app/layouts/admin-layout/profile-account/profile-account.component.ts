import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent {

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
