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

  previousValues = {
    from: this.defaultFrom,
    to: this.defaultTo
  }

  @Output() applyFilter = new EventEmitter<any>();

  private _frmBuilder = inject( UntypedFormBuilder );
  frmDateFilter!: UntypedFormGroup;

  constructor(){

    this.frmDateFilter = this._frmBuilder.group({
      from:  [ this.defaultFrom, [ ] ],
      to:    [ this.defaultTo, [ ] ],
    });

    this.frmDateFilter.valueChanges.subscribe((changes) => {
      
      if(new Date(changes.from) > new Date(changes.to)){
        if(changes.from !== this.previousValues.from) {
          this.frmDateFilter.get('from')?.setValue(this.previousValues.from);
        }
        if(changes.to !== this.previousValues.to) {
          this.frmDateFilter.get('to')?.setValue(this.previousValues.to);
        }
      } else {
        this.previousValues = changes;
      }
    })

  }

  onSubmit(){
    this.applyFilter.emit(this.frmDateFilter.getRawValue());
  }
  
}
