import { Test, TestingModule } from '@nestjs/testing';
import { EmojiMessageController } from './emoji-message.controller';

describe('EmojiMessageController', () => {
  let controller: EmojiMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmojiMessageController],
    }).compile();

    controller = module.get<EmojiMessageController>(EmojiMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
