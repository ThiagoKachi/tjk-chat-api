import { UserStatus } from '@domain/models/account/user-status';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface ChangeStatusValidator {
  validate (data: UserStatus): void | ValidationError
}
