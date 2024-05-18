import { Injectable } from '@angular/core';
import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Stomp.Client;

  constructor() { }

  public connect() {
    let socket = new SockJs("//localhost:8082/websocket");
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }

  public disconnect(){
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }

}
