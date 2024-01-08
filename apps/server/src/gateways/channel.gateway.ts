import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChannelService } from 'src/channel/channel.service';
import { MemberService } from 'src/member/member.service';
import { Member } from 'src/member/model/member.model';

import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/model/message.model';
import { SocketService } from 'src/socket/socket.service';

interface ISocket extends Socket {
  user?: Member;
}

@WebSocketGateway({
  namespace: 'group',
  cors: {
    origin: '*',
  },
})
export class ChannelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly memberService: MemberService,
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
    private readonly socketService: SocketService,
  ) {}
  @WebSocketServer()
  server: Server;
  wsClients = [];

  handleConnection(client: any, ...args: any[]): void {
    console.log('channel 접속');

    this.wsClients.push(client.socket);
    this.server.use(async (socket: ISocket, next) => {
      // socket.handshake.auth
      const { nickname, password } = socket.handshake.auth;

      const user = await this.memberService.login(nickname, password);

      if (user instanceof Error || !user) {
        return next(new Error('로그인 정보가 적절하지 않습니다.'));
      }

      // TODO: socket 최신화
      socket.user = user;

      next();
    });
  }

  handleDisconnect(client: any) {
    console.log('channel 접속 해제');
    this.wsClients = this.wsClients.filter(
      (wsClient) => wsClient['id'] !== client['id'],
    );
  }

  // TODO: Message
  @SubscribeMessage('requestMessage')
  async requestMessage(@MessageBody() data: any): Promise<any> {
    this.server.emit('messages', data);
    return data;
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    { member, channel, content },
  ): Promise<string> {
    const message: Message = {
      member,
      channel,
      emojis: [],
      content,
      is_deleted: false,
    };

    this.messageService.create(message);
    const updatedChannel = await this.channelService.update({
      _id: channel,
      message,
    });

    this.server.emit('updateMessage', updatedChannel.messages);

    return 'complete';
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(
    @MessageBody() { id, member, channel, content },
  ): Promise<string> {
    this.messageService.delete(id);

    const updatedChannel = await this.channelService.deleteChannelMessage(
      channel,
      id,
    );

    this.server.emit('updateMessage', updatedChannel.messages);
    return 'complete';
  }
}
