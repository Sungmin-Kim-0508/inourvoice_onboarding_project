import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './model/channel.model';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MessageModule } from 'src/message/message.module';
import { Message, MessageSchema } from 'src/message/model/message.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
