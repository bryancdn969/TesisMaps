import { Injectable} from '@angular/core';
import { Socket } from 'ngx-socket-io';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  public socketStatus = false;
  public usuario = null;

  constructor (
    private socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al Servidor');
      this.socketStatus = false;
    });

  }

  emit(evento: string, payload?: any, callback?: Function) {

    console.log('Emitiendo', evento);

    this.socket.emit(evento, payload, callback);

  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }
}
