import { Account } from '@domain/models/account/account';

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<Account>;
}
