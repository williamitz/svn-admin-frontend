import { FormControl, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';

export class ActiveNumbverClass {

  private _id: string | null = '';

  private _idAux = UUID();

  name!: FormControl<string | null>;
  number!: FormControl<string | null>;
  rate!: FormControl<number | null>;

  constructor( name: string | null, number: string | null, rate: number, id: string | null = null, ) {

    this._id = id ;
    this.name = new FormControl( name, [ ] );
    this.number = new FormControl( number, [ Validators.required ] );
    this.rate = new FormControl( rate, [ Validators.required, Validators.min(0.5) ] );

  }

  get invalid() { return this.name.invalid || this.number.invalid || this.rate.invalid ; };
  get invalidName() { return this.name?.errors; }
  get invalidNumber() { return this.number?.errors; }
  get invalidRate() { return this.rate?.errors; }

  get auxId() { return this._idAux; }

  get values() {
    return {
      id: this._id,
      name: this.name.value,
      number: this.number.value,
      rate: +this.rate.value!,
    }
   }

}
