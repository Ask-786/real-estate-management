import { EnquiryDiscussionInterface } from './../model/enquiryDiscussion.interfact';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class EnquiryDiscussionService {
  constructor(private socket: Socket) { }

  sendMessage(message: string, enquiryId: string, senderId: string): void {
    return this.socket.emit('sendMessage', { message, enquiryId, senderId });
  }

  getNewMessage() {
    return this.socket.fromEvent<EnquiryDiscussionInterface>('receiveMessage');
  }

  joinRoom(roomId: string) {
    this.socket.emit('join-room', roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leave-room', roomId);
  }
}
