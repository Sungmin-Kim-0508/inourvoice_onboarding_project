import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmojiMessageService } from './emoji-message.service';
import { EmojiMessage } from './model/emoji-message.model';

@Controller('emoji-message')
export class EmojiMessageController {
  constructor(private readonly emojiMessageService: EmojiMessageService) {}

  @Get()
  async findAll(@Query() { channel, message }): Promise<EmojiMessage[]> {
    try {
      if (!channel) return;

      if (!message) return await this.emojiMessageService.find({ channel });

      return await this.emojiMessageService.find({ channel, message });
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  async create(@Body() emojiMessage: EmojiMessage): Promise<EmojiMessage> {
    return this.emojiMessageService.create(emojiMessage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmojiMessage> {
    return this.emojiMessageService.findOne(id);
  }
}
