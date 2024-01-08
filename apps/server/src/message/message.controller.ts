import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './model/message.model';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Message[]> {
    return await this.messageService.findAll();
  }

  @Post()
  async create(@Body() message: Message): Promise<Message> {
    return await this.messageService.create(message);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findOne(id);
  }

  @Post(':id')
  //TODO: Update
  async update(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findOne(id);
  }

  @Post('/:id/delete')
  async delete(@Param('id') id: string): Promise<Message> {
    const deletedMessage = await this.messageService.delete(id);
    return deletedMessage;
  }
}
