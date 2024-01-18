import { AccountEntity } from './accounts.entity';

export class AccountsMapper {
  static toDto(account: AccountEntity) {
    const { email, id, username, createdAt, updatedAt } = account.toJSON();

    return { email, id, username, createdAt, updatedAt };
  }
}
