import { FormControl, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';

export class ContactClass {

  private _id: string | null = '';

  private _idAux = UUID();

  contactType!: FormControl<string | null>;
  contact!: FormControl<string | null>;

  constructor( contactType: string, contact: string, id: string | null = null, ) {

    this._id = id ;
    this.contactType = new FormControl( contactType, [ Validators.required ] );
    this.contact = new FormControl( contact, [ Validators.required ] );

  }

  get invalid() { return this.contactType.invalid || this.contact.invalid ; };
  get invalidType() { return this.contactType?.errors; }
  get invalidContact() { return this.contact?.errors; }
  get typeValue() { return this.contactType?.value; }

  get auxId() { return this._idAux; }

  get values() {
    return {
      id: this._id,
      contactType: this.contactType.value,
      contact: this.contact.value!,
    }
   }

}
