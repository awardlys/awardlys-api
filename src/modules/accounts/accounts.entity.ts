export type AccountProps = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt?: string;
  updatedAt?: string;
};

export class AccountEntity {
  constructor(private readonly props: AccountProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set username(username: string) {
    this.props.username = username;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set passwordHash(passwordHash: string) {
    this.props.passwordHash = passwordHash;
  }
}
