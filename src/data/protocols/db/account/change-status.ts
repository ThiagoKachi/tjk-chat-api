import { UserStatus } from '@domain/models/user-status';

export interface ChangeStatusRepository {
  change (accountId: string, status: UserStatus): Promise<void>;
}
