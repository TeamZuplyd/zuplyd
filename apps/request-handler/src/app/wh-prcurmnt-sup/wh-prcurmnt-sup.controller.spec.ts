import { Test, TestingModule } from '@nestjs/testing';
import { WhPrcurmntSupController } from './wh-prcurmnt-sup.controller';

describe('WhPrcurmntSupController', () => {
  let controller: WhPrcurmntSupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhPrcurmntSupController],
    }).compile();

    controller = module.get<WhPrcurmntSupController>(WhPrcurmntSupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
