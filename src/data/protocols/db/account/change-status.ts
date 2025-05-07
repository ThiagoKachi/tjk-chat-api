import { UserStatus } from '@domain/models/account/user-status';

export interface ChangeStatusRepository {
  change (accountId: string, status: UserStatus): Promise<void>;
}
