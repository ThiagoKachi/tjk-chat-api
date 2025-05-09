import { Account } from '@domain/models/account/account';
import { ILoadAccounts } from '@domain/usecases/account/load-accounts';

export interface LoadAccountsRepository {
  load ({ conversationId, inGroup }: ILoadAccounts): Promise<Account[]>;
}
