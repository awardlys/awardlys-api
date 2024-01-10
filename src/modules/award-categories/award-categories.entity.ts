export type AwardCategoriyProps = {
  id: string;
  awardId: string;
  categoryId: string;
};

export class AwardCategoryEntity {
  constructor(private readonly props: AwardCategoriyProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.id;
  }

  set awardId(awardId: string) {
    this.props.awardId = awardId;
  }

  set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }
}
