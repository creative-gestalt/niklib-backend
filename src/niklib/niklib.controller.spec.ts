import { Test, TestingModule } from '@nestjs/testing';
import { NiklibController } from './niklib.controller';

describe('NiklibController', () => {
  let controller: NiklibController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiklibController],
    }).compile();

    controller = module.get<NiklibController>(NiklibController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
