import { Test, TestingModule } from '@nestjs/testing';
import { OnSubscribeController } from './on_subscribe.controller';

describe('OnSubscribeController', () => {
  let controller: OnSubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnSubscribeController],
    }).compile();

    controller = module.get<OnSubscribeController>(OnSubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
