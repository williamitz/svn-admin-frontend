import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent {

  countries = [
    { id: "1", name: "Perú" },
    { id: "2", name: "EEUU" },
  ];

}
