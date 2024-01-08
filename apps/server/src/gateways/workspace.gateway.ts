import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { MemberService } from 'src/member/member.service';
import { Member } from 'src/member/model/member.model';

interface ISocket extends Socket {
  user?: Member;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WorkspaceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly memberService: MemberService, // private readonly channelService: ChannelService, // private readonly messageService: MessageService, // private readonly socketService: SocketService,
  ) {}
  @WebSocketServer()
  server: Server;
  wsClients = [];

  async handleConnection(client: any, ...args: any[]): Promise<Error | void> {
    console.log('workspace 접속');
    // TODO: socket model 만들고 소켓에 추가 => channel
    this.wsClients.push(client);
    this.server.use(async (socket: ISocket, next) => {
      const { nickname, password } = socket.handshake.auth;

      const user = await this.memberService.login(nickname, password);

      if (user instanceof Error || !user) {
        return next(new Error('로그인 정보가 적절하지 않습니다.'));
      }
      socket.user = user;

      next();
    });
  }

  handleDisconnect(client: any) {
    // TODO: socket model 제거하고 소켓 pop
    // MEMO: 소켓에 영향을 받는 사람은 누구지? => channel
    console.log('workspace 접속 해제');
    this.wsClients.filter((wsClient) => wsClient['id'] !== client['id']);
  }

  //TODO: 로그인 로직
  @SubscribeMessage('user')
  findAll(@MessageBody() data: { socketId: string }): Promise<any> {
    console.log('user login: ', data);
    return;
  }
}
