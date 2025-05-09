import { Account } from '@domain/models/account/account';

export interface ILoadAccounts {
  conversationId?: string;
  inGroup?: boolean;
}

export interface LoadAccounts {
  load ({ conversationId, inGroup }: ILoadAccounts): Promise<Account[]>
}
