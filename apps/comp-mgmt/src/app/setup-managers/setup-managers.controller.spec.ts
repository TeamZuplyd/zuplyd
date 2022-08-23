import { Test, TestingModule } from '@nestjs/testing';
import { SetupManagersController } from './setup-managers.controller';

describe('SetupManagersController', () => {
  let controller: SetupManagersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupManagersController],
    }).compile();

    controller = module.get<SetupManagersController>(SetupManagersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
