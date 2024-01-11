export type PollProps = {
  id: string;
  accountId: string;
  gameCategoryId: string;
  pollDate: Date;
};

export class PollEntity {
  constructor(private readonly props: PollProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set accountId(accountId: string) {
    this.props.accountId = accountId;
  }

  set gameCategoryId(gameCategoryId: string) {
    this.props.gameCategoryId = gameCategoryId;
  }

  set pollDate(pollDate: Date) {
    this.props.pollDate = pollDate;
  }
}
