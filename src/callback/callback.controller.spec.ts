import { Test, TestingModule } from '@nestjs/testing';
import { CallbackController } from './callback.controller';

describe('CallbackController', () => {
  let controller: CallbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallbackController],
    }).compile();

    controller = module.get<CallbackController>(CallbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
