import { Test, TestingModule } from '@nestjs/testing';
import { NiklibService } from './niklib.service';

describe('NiklibService', () => {
  let service: NiklibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiklibService],
    }).compile();

    service = module.get<NiklibService>(NiklibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
