import { Test, TestingModule } from '@nestjs/testing';
import { AwardCategoriesController } from './award-categories.controller';

describe('AwardCategoriesController', () => {
  let controller: AwardCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardCategoriesController],
    }).compile();

    controller = module.get<AwardCategoriesController>(AwardCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
