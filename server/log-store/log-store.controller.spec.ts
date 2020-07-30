import { Test, TestingModule } from '@nestjs/testing';
import { LogStoreController } from './log-store.controller';

describe('LogStore Controller', () => {
  let controller: LogStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogStoreController],
    }).compile();

    controller = module.get<LogStoreController>(LogStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
