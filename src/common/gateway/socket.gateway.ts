import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import io, { Namespace, Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat', cors: true })
export class EventsGateway {
  @WebSocketServer()
  nsp: Namespace;

  //초기화 이후 실행
  // afterInit() {}

  // // 소켓이 연결되면 실행
  // handleConnection(@ConnectedSocket() socket: Socket) {
  //   console.log('연결된 것 같네요... Socket Id: ', socket.id);
  // }

  // // 소켓 연결이 끊기면 실행
  // handleDisconnect(@ConnectedSocket() socket: Socket) {
  //   console.log('연결이 끊긴것 같네요... Socket Id: ', socket.id);
  // }

  // //init room
  // initRoom() {
  //   //namespace가 없을경우 웹소켓 타입이 Socket으로 잡음. 이때 adapter속성은 안쓰고 on 메서드 사용하면 되는듯.
  //   this.nsp.adapter.on('create-room', (room) => {
  //     console.log(`${room} 방이 생성되었습니다.`);
  //   });

  //   this.nsp.adapter.on('join-room', (room, id) => {
  //     console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
  //   });

  //   this.nsp.adapter.on('leave-room', (room, id) => {
  //     console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
  //   });

  //   this.nsp.adapter.on('delete-room', (roomName) => {
  //     console.log(`"Room:${roomName}"이 삭제되었습니다.`);
  //   });

  //   console.log('웹소켓 서버 초기화 ✅');
  // }

  @SubscribeMessage('hi')
  async handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ): Promise<{ message: string }> {
    console.log(data);
    // console.log(client);
    client.emit('hi', { message: data?.message + '그런데 res를 첨가한' });
    return data;
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.roomId);

    this.nsp.to(client.id).emit('createRoom', {
      roomId: data.roomId,
      message: '방이 생성되었습니다. 룸 아이디(호스트): ' + data.roomId,
    });
    // this.nsp.emit('joinedRoom', {
    //   roomId: data.roomId,
    //   message: '방이 생성되었습니다. 룸 아이디(호스트): ' + data.roomId,
    // });
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() data: { roomId: string; username: string }, @ConnectedSocket() client: Socket) {
    console.log(data.roomId);
    client.join(data.roomId);
    this.nsp.emit('joinedRoom', { roomId: data.roomId, message: `${data.username || 'Err'}님이 들어오셨습니다.` });
    this.nsp.to(data.roomId).emit('joinedRoom', { roomId: data.roomId, message: `${client.id}가 들어왔대 왜 왔댐` });
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@MessageBody() data: { roomId: string; username: string }, @ConnectedSocket() client: Socket) {
    client.leave(data.roomId);
    this.nsp.emit('leftRoom', `${data.username}가 나갔대 웅성웅성`);
  }

  @SubscribeMessage('msg')
  msg(@MessageBody() data: { roomId: string; message: string }, @ConnectedSocket() client: Socket) {
    this.nsp.to(data.roomId).emit('msg', { message: data.message });
  }
}
