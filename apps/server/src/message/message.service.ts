import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './model/message.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModal: Model<MessageDocument>,
  ) {}

  async create(message: Message): Promise<Message> {
    const createMessage = new this.messageModal(message);

    return await createMessage.save();
  }

  async findOne(id: string): Promise<Message> {
    const message = (
      await this.messageModal.findById(id).populate('channel')
    ).populate('member');

    return message;
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModal
      .find()
      .populate('channel')
      .populate('member')
      .exec();
  }

  async delete(id: string): Promise<Message> {
    try {
      const targetMessage = await this.messageModal.findByIdAndUpdate(id, {
        is_deleted: true,
      });

      return {
        ...targetMessage,
        is_deleted: true,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
