import { Test, TestingModule } from '@nestjs/testing';
import { ItemCategoryController } from './item-category.controller';

describe('ItemCategoryController', () => {
  let controller: ItemCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCategoryController],
    }).compile();

    controller = module.get<ItemCategoryController>(ItemCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
