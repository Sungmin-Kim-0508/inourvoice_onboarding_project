import { Module } from '@nestjs/common';
import { EmojiMessageService } from './emoji-message.service';
import { EmojiMessageController } from './emoji-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiMessage, EmojiMessageSchema } from './model/emoji-message.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmojiMessage.name, schema: EmojiMessageSchema },
    ]),
  ],
  providers: [EmojiMessageService],
  controllers: [EmojiMessageController],
})
export class EmojiMessageModule {}
