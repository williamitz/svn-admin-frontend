import { FormControl, Validators } from "@angular/forms";
import { v4 as UUID } from 'uuid';

export class DepartmentClass {

  private _idAux = UUID();
  private _id = '';
  nameControl!: FormControl;
  accessCodeControl!: FormControl;

  constructor( departmentName: string, accessCode: string, id?: string, ) {
    this._id = id ?? '';
    this.nameControl = new FormControl( departmentName, [ Validators.required ] );
    this.accessCodeControl = new FormControl( accessCode, [ Validators.required ] );

  }

  get invalid() { return this.nameControl.invalid || this.accessCodeControl.invalid ; };
  get invalidName() { return this.nameControl?.errors; }
  get invalidAccessCode() { return this.accessCodeControl?.errors; }
  get auxId() { return this._idAux; }

  get values() {
    return {
      id: this._id,
      departmentName: this.nameControl.value,
      accessCode: this.accessCodeControl.value,
    }
  }

}
