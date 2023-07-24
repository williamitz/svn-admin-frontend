import { FormControl, Validators } from '@angular/forms';
import { v4 as UUID } from 'uuid';


export class OfficeHourClass {
  private _idAux = UUID();
  private _id = '';
  private _dayName = '';

  checked!: FormControl;
  timeStart!: FormControl;
  timeEnd!: FormControl;

  constructor(
      checked: boolean | null
      , dayName: string
      , timeStart: string | null
      , timeEnd: string | null
      , id?: string  ) {

    this._id = id ?? '';
    this._dayName = dayName;
    this.checked = new FormControl( checked, [ ] );
    this.timeStart = new FormControl( timeStart, checked == true ? [ Validators.required ] : []   );
    this.timeEnd = new FormControl( timeEnd, checked == true ? [ Validators.required ] : [] );
  }

  get invalid() { return this.timeStart.invalid || this.timeEnd.invalid; };
  get invalidChecked() { return this.checked?.errors; }
  get invalidTimeStart() { return this.timeStart?.errors; }
  get invalidTimeEnd() { return this.timeEnd?.errors; }
  get auxId() { return this._idAux; }

  get dayName() { return this._dayName; }

  get values() {
    return {
      id: this._id,
      dayName: this._dayName,
      timeStart: this.timeStart.value,
      timeEnd: this.timeEnd.value,
      checked: this.checked.value,
    }
  }

  onChangeValidators() {
    const checked = this.checked.value;

    if( checked ) {

      this.timeStart.addValidators( [Validators.required] );
      this.timeStart.updateValueAndValidity();

      this.timeEnd.addValidators( [Validators.required] );
      this.timeEnd.updateValueAndValidity();

    } else {
      this.timeStart.removeValidators( [Validators.required] );
      this.timeStart.updateValueAndValidity();

      this.timeEnd.removeValidators( [Validators.required] );
      this.timeEnd.updateValueAndValidity();
    }

  }
}
