import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Socket } from './model/socket.model';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}
  @Get()
  async findAll(@Req() request: Request): Promise<Socket[]> {
    return await this.socketService.findAll();
  }

  @Post()
  async create(@Body() socket: Socket): Promise<Socket> {
    return await this.socketService.create(socket);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Socket> {
    return await this.socketService.findOne(id);
  }

  @Post(':id')
  //TODO: Update
  async update(@Param('id') id: string): Promise<Socket> {
    return await this.socketService.findOne(id);
  }

  @Post('/:id/delete')
  async delete(@Param('id') id: string): Promise<void> {
    // const deleteScoket = await this.socketService.delete(id);
    // return deleteScoket;
  }
}
