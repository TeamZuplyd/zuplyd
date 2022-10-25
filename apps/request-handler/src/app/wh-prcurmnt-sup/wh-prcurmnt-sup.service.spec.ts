import { Test, TestingModule } from '@nestjs/testing';
import { WhPrcurmntSupService } from './wh-prcurmnt-sup.service';

describe('WhPrcurmntSupService', () => {
  let service: WhPrcurmntSupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhPrcurmntSupService],
    }).compile();

    service = module.get<WhPrcurmntSupService>(WhPrcurmntSupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
