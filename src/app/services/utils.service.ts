import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UtilsService {

  private _fileValid = ['PNG', 'JPG', 'JPEG'];

  onValidImg(extension: string, size: number): boolean {
    let msg = '';
    let verifyFile = true;

    if (!this._fileValid.includes(extension.toUpperCase())) {
      msg = `Solo se aceptan archivos de tipo ${this._fileValid.join(
        ', '
      )}`;
      verifyFile = false;
    }

    if (size > 10) {
      msg = 'Solo se aceptar archivos con un tamaño máximo de 10 mb';
      verifyFile = false;
    }

    if (!verifyFile) return false;

    return true;
  }


}
