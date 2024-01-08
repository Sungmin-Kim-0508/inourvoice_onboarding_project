import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  EmojiMessage,
  EmojiMessageDocument,
} from './model/emoji-message.model';

@Injectable()
export class EmojiMessageService {
  constructor(
    @InjectModel(EmojiMessage.name)
    private emojiMessageModel: Model<EmojiMessageDocument>,
  ) {}

  async create(emojiMessage: EmojiMessage): Promise<EmojiMessage> {
    const createEmojiMessage = new this.emojiMessageModel(emojiMessage);
    return await createEmojiMessage.save();
  }

  async findOne(id: string): Promise<EmojiMessage> {
    return await this.emojiMessageModel.findById(id);
  }

  async findAll(): Promise<EmojiMessage[]> {
    return await this.emojiMessageModel.find().exec();
  }

  async find(args: {
    channel?: string;
    message?: string;
  }): Promise<EmojiMessage[]> {
    return this.emojiMessageModel.find({ ...args }).exec();
  }
}
