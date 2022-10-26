import { Test, TestingModule } from '@nestjs/testing';
import { ItemCategoryService } from './item-category.service';

describe('ItemCategoryService', () => {
  let service: ItemCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCategoryService],
    }).compile();

    service = module.get<ItemCategoryService>(ItemCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
