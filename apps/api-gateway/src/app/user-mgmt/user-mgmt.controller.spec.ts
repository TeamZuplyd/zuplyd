import { Test, TestingModule } from '@nestjs/testing';
import { UserMgmtController } from './user-mgmt.controller';

describe('UserMgmtController', () => {
  let controller: UserMgmtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMgmtController],
    }).compile();

    controller = module.get<UserMgmtController>(UserMgmtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
