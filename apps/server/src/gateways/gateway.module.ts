import { Module } from '@nestjs/common';
import { WorkspaceGateway } from './workspace.gateway';
import { ChannelGateway } from './channel.gateway';
import { MessageService } from 'src/message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/message/model/message.model';
import { Member, MemberSchema } from 'src/member/model/member.model';
import { MemberService } from 'src/member/member.service';
import { ChannelService } from 'src/channel/channel.service';
import { Channel, ChannelSchema } from 'src/channel/model/channel.model';
import { Socket, SocketSchema } from 'src/socket/model/socket.model';
import { SocketService } from 'src/socket/socket.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Socket.name, schema: SocketSchema }]),
  ],
  providers: [
    WorkspaceGateway,
    ChannelGateway,
    MessageService,
    MemberService,
    ChannelService,
    SocketService,
  ],
})
export class GatewayModule {}
