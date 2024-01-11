import { Test, TestingModule } from '@nestjs/testing';
import { GameCategoriesController } from './game-categories.controller';

describe('GameCategoriesController', () => {
  let controller: GameCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameCategoriesController],
    }).compile();

    controller = module.get<GameCategoriesController>(GameCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
