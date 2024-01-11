export type GameCategoryProps = {
  id: string;
  awardCategoryId: string;
  gameId: string;
};

export class GameCategoryEntity {
  constructor(private readonly props: GameCategoryProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set awardCategoryId(awardCategoryId: string) {
    this.props.awardCategoryId = awardCategoryId;
  }

  set gameId(gameId: string) {
    this.props.gameId = gameId;
  }
}
