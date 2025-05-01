import { UserStatus } from '@domain/models/user-status';

export interface ChangeStatus {
  change(accountId: string, status: UserStatus): Promise<void>
}
