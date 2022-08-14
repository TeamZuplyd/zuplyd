import { Test, TestingModule } from '@nestjs/testing';
import { UserMgmtService } from './user-mgmt.service';

describe('UserMgmtService', () => {
  let service: UserMgmtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMgmtService],
    }).compile();

    service = module.get<UserMgmtService>(UserMgmtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
