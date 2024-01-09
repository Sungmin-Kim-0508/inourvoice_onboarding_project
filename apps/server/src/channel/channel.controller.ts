import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Request } from 'express';
import { Channel } from './model/channel.model';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findAll(@Query() { title }): Promise<Channel[]> {
    try {
      if (title) return this.channelService.find({ title });
      return this.channelService.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  async create(@Body() channel: Channel): Promise<Channel> {
    return this.channelService.create(channel);
  }

  @Post(':id')
  async update(
    @Body() { id, connected_user }: { id: string; connected_user: string },
  ): Promise<void> {
    // return this.channelService.update({ id, connected_user });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Channel> {
    try {
      return this.channelService.findOne(id);
    } catch (error) {
      console.error(error);
    }
  }
}
