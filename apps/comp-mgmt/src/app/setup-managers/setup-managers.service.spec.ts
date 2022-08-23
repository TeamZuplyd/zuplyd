import { Test, TestingModule } from '@nestjs/testing';
import { SetupManagersService } from './setup-managers.service';

describe('SetupManagersService', () => {
  let service: SetupManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupManagersService],
    }).compile();

    service = module.get<SetupManagersService>(SetupManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
