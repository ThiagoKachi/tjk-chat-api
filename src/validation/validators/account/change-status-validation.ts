import { AccountStatus } from '@domain/models/account/account';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface ChangeStatusValidator {
  validate (data: AccountStatus): void | ValidationError
}
