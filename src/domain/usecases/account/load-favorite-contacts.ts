import { Account } from '@domain/models/account/account';

export interface LoadFavoriteContacts {
  loadFavorites (accountId: string): Promise<Account[]>
}
