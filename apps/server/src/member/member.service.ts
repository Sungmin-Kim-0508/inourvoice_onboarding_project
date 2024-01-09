import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './model/member.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import dbConfig from 'config/db.config';
import { ConfigType } from '@nestjs/config';
import tokenConfig from 'config/token.config';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
    @Inject(tokenConfig.KEY)
    private configService: ConfigType<typeof tokenConfig>,
    private jwtService: JwtService,
  ) {}

  async create(member: Member): Promise<Member> {
    const createMember = new this.memberModel(member);
    return await createMember.save();
  }

  async findOne(id: string): Promise<Member> {
    return await this.memberModel.findById(id);
  }

  async findAll(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async login(nickname: string, password: string): Promise<Member | Error> {
    try {
      const user = await this.memberModel
        .findOne({ nickname, password })
        .populate('channels')
        .populate({
          path: 'channels',
          populate: {
            path: 'creator',
            model: 'Member',
          },
        })
        .populate({
          path: 'channels',
          populate: {
            path: 'messages',
            model: 'Message',
          },
        })
        .populate({
          path: 'channels',
          populate: {
            path: 'sockets',
            model: 'Socket',
          },
        });

      return user;
      // TODO: JWT 검증
      // if (user?.password !== password) throw new UnauthorizedException();

      // const payload = { id: user._id, nickname: user.nickname };

      // return {
      //   access_token: await this.jwtService.signAsync(payload, {
      //     secret: this.configService['secret'],
      //   }),
      // };
    } catch (error) {
      console.error(error);
    }
  }
}
