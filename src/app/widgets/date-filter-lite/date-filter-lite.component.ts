import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-filter-lite',
  templateUrl: './date-filter-lite.component.html',
  styleUrls: ['./date-filter-lite.component.scss']
})
export class DateFilterLiteComponent {

  @Input() defaultFrom = new Date().toISOString().substring(0, 10);
  @Input() defaultTo = new Date().toISOString().substring(0, 10);

  @Output() applyFilter = new EventEmitter<any>();

  private _frmBuilder = inject( UntypedFormBuilder );
  frmDateFilter!: UntypedFormGroup;

  constructor(){

    this.frmDateFilter = this._frmBuilder.group({
      from:  [ this.defaultFrom, [ ] ],
      to:    [ this.defaultTo, [ ] ],
    });

  }

  onSubmit(){
    this.applyFilter.emit(this.frmDateFilter.getRawValue());
  }
  
}
