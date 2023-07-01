import { Component } from '@angular/core';

@Component({
  selector: 'app-pool-add-interpreter',
  templateUrl: './pool-add-interpreter.component.html',
  styleUrls: ['./pool-add-interpreter.component.scss']
})
export class PoolAddInterpreterComponent {

  lista=[
    {
      name: 'Javier',
      language: 'Spanish',
      service: 'Certifications',
      gender: 'Male'
    },
    {
      name: 'Lorena',
      language: 'English',
      service: 'Certifications',
      gender: 'Female'
    },
    {
      name: 'Javier',
      language: 'Spanish',
      service: 'Certifications',
      gender: 'Male'
    }
  ];

}
