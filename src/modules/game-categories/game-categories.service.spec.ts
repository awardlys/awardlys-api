import { Test, TestingModule } from '@nestjs/testing';
import { GameCategoriesService } from './game-categories.service';

describe('GameCategoriesService', () => {
  let service: GameCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCategoriesService],
    }).compile();

    service = module.get<GameCategoriesService>(GameCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
