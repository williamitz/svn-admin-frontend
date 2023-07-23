import { FormControl, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';

export class RateClass {

  private _id: string | null = '';

  private _idAux = UUID();

  type!: FormControl<string | null>;
  rate!: FormControl<number | null>;

  constructor( type: string, rate: number, id: string | null = null, ) {

    this._id = id ;
    this.type = new FormControl( type, [ Validators.required ] );
    this.rate = new FormControl( rate, [ Validators.required, Validators.min(0.5) ] );

  }

  get invalid() { return this.type.invalid || this.rate.invalid ; };
  get invalidType() { return this.type?.errors; }
  get invalidRate() { return this.rate?.errors; }
  get typeValue() { return this.type?.value; }

  get auxId() { return this._idAux; }
  // get id() { return this._id; }

  get values() {
    return {
      id: this._id,
      type: this.type.value,
      rate: +this.rate.value!,
    }
   }

}
