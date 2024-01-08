import { Test, TestingModule } from '@nestjs/testing';
import { EmojiMessageService } from './emoji-message.service';

describe('EmojiMessageService', () => {
  let service: EmojiMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmojiMessageService],
    }).compile();

    service = module.get<EmojiMessageService>(EmojiMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
