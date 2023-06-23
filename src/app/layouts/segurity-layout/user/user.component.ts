import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  selectedPeople: any;

  roles = [
    { id: '1', name: 'Client' },
    { id: '2', name: 'Interpeter' },
  ];

}
