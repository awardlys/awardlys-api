export type AwardProps = {
  id: string;
  description: string;
  status: keyof typeof AwardStatus;
  title: string;
  subTitle: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum AwardStatus {
  draft,
  active,
  expired,
}

export class AwardEntity {
  constructor(private readonly props: AwardProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set subTitle(subTitle: string) {
    this.props.subTitle = subTitle;
  }

  set description(description: string) {
    this.props.description = description;
  }
}
