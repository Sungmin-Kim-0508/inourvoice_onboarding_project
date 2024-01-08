import { Get, Injectable } from '@nestjs/common';
import { Socket, SocketDocument } from './model/socket.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Socket.name) private socketModel: Model<SocketDocument>,
  ) {}

  @Get()
  async findOne(id: string): Promise<Socket> {
    return await this.socketModel.findById(id);
  }

  async create(message: Socket): Promise<Socket> {
    const createMessage = new this.socketModel(message);

    return await createMessage.save();
  }

  async findAll(): Promise<Socket[]> {
    return await this.socketModel.find().populate('member').exec();
  }

  async delete(id: string): Promise<void> {
    // try {
    //   const targetMessage = await this.socketModel.findByIdAndUpdate(id, {
    //     is_deleted: true,
    //   });
    //   return {
    //     ...targetMessage,
    //     is_deleted: true
    //   };
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
