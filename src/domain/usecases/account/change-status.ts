import { UserStatus } from '@domain/models/account/user-status';

export interface ChangeStatus {
  change(accountId: string, status: UserStatus): Promise<void>
}
