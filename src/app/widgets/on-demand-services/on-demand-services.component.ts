import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-on-demand-services',
  templateUrl: './on-demand-services.component.html',
  styleUrls: ['./on-demand-services.component.scss']
})
export class OnDemandServicesComponent {

  @Input() data = {
    phone: {
      calls: 85,
      minutes: 834,
      duration: 11
    },
    video: {
      calls: 111,
      minutes: 795,
      duration: 8
    }
  }

}
