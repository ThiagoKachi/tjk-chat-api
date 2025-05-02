import { Account } from '@domain/models/account/account';

export interface LoadFavoriteContactsRepository {
  loadFavorites (accountId: string): Promise<Account[]>;
}
