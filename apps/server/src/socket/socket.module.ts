import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Socket, SocketSchema } from './model/socket.model';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Socket.name, schema: SocketSchema }]),
  ],
  providers: [SocketService],
  controllers: [SocketController],
})
export class SocketModule {}
