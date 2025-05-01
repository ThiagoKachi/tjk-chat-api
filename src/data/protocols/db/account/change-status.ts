import { AccountStatus } from '@domain/models/account/account';

export interface ChangeStatusRepository {
  change (accountId: string, status: AccountStatus): Promise<void>;
}
