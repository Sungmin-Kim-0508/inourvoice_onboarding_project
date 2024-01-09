import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Emoji, EmojiDocument } from './model/emoji.model';

@Injectable()
export class EmojiService {
  constructor(
    @InjectModel(Emoji.name) private emojiModel: Model<EmojiDocument>,
  ) {}

  async create(emoji: Emoji): Promise<Emoji> {
    const createEmoji = new this.emojiModel(emoji);
    return await createEmoji.save();
  }

  async findOne(id: string): Promise<Emoji> {
    return await this.emojiModel.findById(id);
  }

  async findAll(): Promise<Emoji[]> {
    return await this.emojiModel.find().exec();
  }
}
