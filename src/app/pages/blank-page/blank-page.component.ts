import { Component } from '@angular/core';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent {

  selectedPeople: any;

  roles = [
    { id: '1', name: 'Client' },
    { id: '2', name: 'Interpeter' },
  ];


}
