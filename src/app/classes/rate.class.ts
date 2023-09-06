import { FormControl, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';
import { numberPatt } from "../utils";

export class RateClass {

  private _id: string | null = '';

  private _idAux = UUID();

  idiom!: FormControl<string | null>;
  type!: FormControl<string | null>;
  rate!: FormControl<number | null>;

  constructor( idiom: string | null, type: string, rate: number, id: string | null = null, ) {

    this._id = id ;
    // Validators.required
    this.idiom = new FormControl( idiom, [  ] );
    this.type = new FormControl( type, [ Validators.required ] );
    this.rate = new FormControl( rate, [ Validators.required, Validators.min(0.5), Validators.pattern( numberPatt ) ] );

  }

  get invalid() { return this.idiom.invalid || this.type.invalid || this.rate.invalid ; };
  get invalidIdiom() { return this.idiom?.errors; }
  get invalidType() { return this.type?.errors; }
  get invalidRate() { return this.rate?.errors; }
  get typeValue() { return this.type?.value; }

  get auxId() { return this._idAux; }
  // get id() { return this._id; }

  get values() {
    return {
      id: this._id,
      idiom: this.idiom.value,
      type: this.type.value,
      rate: +this.rate.value!,
    }
   }

}
