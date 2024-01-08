import { Module } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { EmojiController } from './emoji.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Emoji, EmojiSchema } from './model/emoji.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Emoji.name, schema: EmojiSchema }]),
  ],
  providers: [EmojiService],
  controllers: [EmojiController],
})
export class EmojiModule {}
