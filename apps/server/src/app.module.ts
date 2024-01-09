import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import appConfig from '../config/app.config';
import dbConfig from '../config/db.config';

import { MemberModule } from './member/member.module';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { EmojiModule } from './emoji/emoji.module';
import { EmojiMessageModule } from './emoji-message/emoji-message.module';
import { GatewayModule } from './gateways/gateway.module';
import { SocketModule } from './socket/socket.module';
import tokenConfig from 'config/token.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig, tokenConfig],
    }),
    DbModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get<string>(
          'db.host',
        )}:${configService.get<string>('db.port')}`;
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),

    MemberModule,
    ChannelModule,
    MessageModule,
    EmojiModule,
    EmojiMessageModule,
    GatewayModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
