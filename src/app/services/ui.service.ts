import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { EIconAlert } from '../interfaces/alertIcon.enum';


@Injectable({providedIn: 'root'})
export class UiService {

  onShowAlert( text: string, icon?: EIconAlert, title?: string, html?: string  ) {

    Swal.fire({
      title,
      icon,
      text,
      html,
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      // cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  onShowLoading() {
    Swal.fire({
      title: '',
      html: 'Waiting...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      // customClass: {
      //   icon: 'animated bounce',
      //   popup: 'sw-alert-container',
      // },
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }

  onShowConfirm(text: string, title?: string) {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#364574',
      confirmButtonText: 'Sí!'
    })
  }

  onClose() {
    Swal.close();
  }

}
