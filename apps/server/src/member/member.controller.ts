import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request, query } from 'express';
import { Member } from './model/member.model';
import { MemberService } from './member.service';

@Controller('user')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async login(
    @Query() { nickname, password }: { nickname: string; password: string },
  ): Promise<
    | Member
    | { statusCode: number; message: string }
    | Error
    | { access_token: string }
  > {
    try {
      const token = await this.memberService.login(nickname, password);
      if (!token)
        return {
          statusCode: 404,
          message: '일치하는 유저가 없습니다.',
        };

      return token;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 404,
        message: '일치하는 유저가 없습니다.',
      };
    }
  }

  @Post()
  async create(@Body() member: Member): Promise<Member> {
    return this.memberService.create(member);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }
}
