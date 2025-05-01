import { AccountStatus } from '@domain/models/account/account';

export interface ChangeStatus {
  change(accountId: string, status: AccountStatus): Promise<void>
}
