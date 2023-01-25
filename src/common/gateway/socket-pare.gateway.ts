import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'pare', cors: true })
export class PareProgramingGateway {
  @WebSocketServer()
  nsp: Namespace;

  @SubscribeMessage('create')
  createPareRoom(
    @MessageBody() data: { roomId: string; userInfo: { username: string; img: string } },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    this.nsp.to(data.roomId).emit('alert', {
      type: 'alert',
      message: `${data.userInfo.username}님이 페어프로그래밍 방을 개설했습니다.`,
    });
    return;
  }

  @SubscribeMessage('join')
  joinPareRoom(
    @MessageBody() data: { roomId: string; userInfo: { username: string; img: string } },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    this.nsp
      .to(data.roomId)
      .emit('alert', { type: 'alert', message: `${data.userInfo.username}님이 페어프로그래밍 방에 입장하셨습니다.` });
    return;
  }

  @SubscribeMessage('leave')
  leavePareRoom(
    @MessageBody() data: { roomId: string; userInfo: { username: string; img: string } },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.roomId);
    this.nsp
      .to(data.roomId)
      .emit('alert', { type: 'alert', message: `${data.userInfo.username}님이 방을 나갔습니다.` });
    return;
  }

  @SubscribeMessage('write')
  write(
    @MessageBody()
    data: {
      roomId: string;
      userInfo: { username: string; img: string };
      writwInfo: {
        line: number;
        column: number;
        word: string;
      };
    },
    @ConnectedSocket() client: Socket,
  ) {
    this.nsp.to(data.roomId).emit('recieveWrite', { type: 'recieveWrite', data });
    return;
  }
}
