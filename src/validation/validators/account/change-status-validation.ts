import { UserStatus } from '@domain/models/user-status';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface ChangeStatusValidator {
  validate (data: UserStatus): void | ValidationError
}
