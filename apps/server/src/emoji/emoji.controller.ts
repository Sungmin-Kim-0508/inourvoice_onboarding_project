import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { Emoji } from './model/emoji.model';

@Controller('emoji')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Emoji[]> {
    return this.emojiService.findAll();
  }

  @Post()
  async create(@Body() emoji: Emoji): Promise<Emoji> {
    return this.emojiService.create(emoji);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Emoji> {
    return this.emojiService.findOne(id);
  }
}
