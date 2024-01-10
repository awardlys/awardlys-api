import { Test, TestingModule } from '@nestjs/testing';
import { AwardCategoriesService } from './award-categories.service';

describe('AwardCategoriesService', () => {
  let service: AwardCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardCategoriesService],
    }).compile();

    service = module.get<AwardCategoriesService>(AwardCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
