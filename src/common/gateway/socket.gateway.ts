import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import io, { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

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
}
