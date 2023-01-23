import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hi')
  async handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): Promise<string> {
    console.log(data, client);
    return data;
  }
}
