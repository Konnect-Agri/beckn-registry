import { Test, TestingModule } from '@nestjs/testing';
import { OnSubscribeService } from './on_subscribe.service';

describe('OnSubscribeService', () => {
  let service: OnSubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnSubscribeService],
    }).compile();

    service = module.get<OnSubscribeService>(OnSubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
