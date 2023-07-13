import { inject } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';

export class CampusClass {

  private _idAux = UUID();
  private _id = '';
  nameControl!: FormControl;
  cityControl!: FormControl;
  addressControl!: FormControl;

  constructor( campusName: string, city: string, address?: string, id?: string, ) {
    this._id = id ?? '';
    this.nameControl = new FormControl( campusName, [ Validators.required ] );
    this.cityControl = new FormControl( city, [ Validators.required ] );
    this.addressControl = new FormControl( address, [] );

  }

  get invalid() { return this.nameControl.invalid || this.cityControl.invalid || this.addressControl.invalid; };
  get invalidName() { return this.nameControl?.errors; }
  get invalidCity() { return this.cityControl?.errors; }
  get invalidAddress() { return this.addressControl?.errors; }
  get auxId() { return this._idAux; }


  get values() {
    return {
      id: this._id,
      campusName: this.nameControl.value,
      city: this.cityControl.value,
      address: this.addressControl.value,
    }
   }

}
