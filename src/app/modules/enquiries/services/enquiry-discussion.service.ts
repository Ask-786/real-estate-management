import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class EnquiryDiscussionService {
  constructor(private socket: Socket) {}

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newMessage');
  }
}
