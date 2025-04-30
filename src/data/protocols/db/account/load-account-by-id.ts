import { Account } from '@domain/models/account/account';

export interface LoadAccountByIdRepository {
  loadById(id: string): Promise<Account>;
}
