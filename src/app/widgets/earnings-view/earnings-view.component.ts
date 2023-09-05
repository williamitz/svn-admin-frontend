import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-earnings-view',
  templateUrl: './earnings-view.component.html',
  styleUrls: ['./earnings-view.component.scss']
})
export class EarningsViewComponent {

  @Input() profileRating = 0;
  @Input() earnings = 334;

}
