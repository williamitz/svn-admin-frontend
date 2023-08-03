import { Injectable, inject } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  statusSocket = false;
  logeed = false;

  private io = inject( Socket );

  private st = inject( StorageService );

  onStatusSocket() {

    console.log('onStatusSocket ::: ');
    // this.st.onLoadData();
    // this.store.dispatch( authActions.setUser( {user: this.st.dataUser} ) );

    this.io.on('connect', (res: any) => {
      if (!this.statusSocket) {

      }

      this.statusSocket = true;

      this.onSingUserSocket()
        .then((res) => {


        })
        .catch((e) => {
          console.error(e);
        });

    });

    this.io.on('disconnect', () => {
      this.statusSocket = false;

    });
  }

  onEmit(event: string, payload: any, callback: Function) {
    return this.io.emit(event, payload, callback);
  }

  onListen(event: string) {
    return this.io.fromEvent(event);
  }

  onListenAux(event: string, callback: Function) {
    return this.io.on(event, callback);
  }

  onSingUserSocket(): Promise<any> {
    return new Promise((resolve, reject) => {

      const token = this.st.getItem('token');

      if ( token === '' ) {
        return reject({
          ok: false,
          showError: 400,
          error: {
            message: 'Authenticar primero!',
          },
        });
      }

      this.onEmit('singin', { token }, (res: any) => {
        if (!res.ok) {
          this.logeed = false;
          return reject(res.error);
        }
        this.logeed = true;
        resolve(res);
      });

    });
  }

  onLogOutSocket(): Promise<any> {

    const token = this.st.getItem('token');

    return new Promise((resolve, reject) => {

      this.onEmit('logout-user', { token }, (res: any) => {
        if (!res.ok) {
          return reject(res.error);
        }

        this.logeed = false;
        resolve(res);

      });
    });
  }
}
