import { Injectable } from '@nestjs/common';
import { Channel, ChannelDocument } from './model/channel.model';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from 'src/message/model/message.model';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(channel: Channel): Promise<Channel> {
    const createChannel = new this.channelModel(channel);
    return createChannel.save();
  }

  //TODO: channel update 시 중복 체크
  async update({
    _id,
    message,
  }: {
    _id: string;
    message: Message;
  }): Promise<Channel> {
    // TODO: socket으로 업데이트
    try {
      const targetChannel = await this.channelModel.findOne({ _id });
      targetChannel['messages'].push(message);
      await targetChannel.save();
      return {
        ...targetChannel,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string): Promise<Channel> {
    const channel = await this.channelModel.findById(id).exec();

    console.log(channel);
    return await this.channelModel.findById(id).exec();
  }

  async findAll(): Promise<Channel[]> {
    return await this.channelModel.find().populate('messages').exec();
  }

  async find(args: { title?: string }): Promise<Channel[]> {
    return this.channelModel.find({ ...args }).exec();
  }

  async findConnectedChannel({
    userId,
  }: {
    userId?: string;
  }): Promise<Channel[]> {
    return this.channelModel.find({
      connected_user: {
        $elemMatch: { id: userId },
      },
    });
  }

  async deleteChannelMessage(id: string, messageId: string): Promise<Channel> {
    try {
      // 메세지 불러와서 고치고
      // 해당 메세지 channel에 집어넣기

      (
        await this.messageModel.findByIdAndUpdate(id, { is_deleted: true })
      ).save();

      const messages = (await this.messageModel.find()).map((message) => {
        if (message.id === messageId) {
          return { ...message, message, is_deleted: true };
        } else {
          return message;
        }
      });

      const targetChannel = await (
        await this.channelModel.findByIdAndUpdate(id, {
          messages,
        })
      ).save();

      return {
        ...targetChannel,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
