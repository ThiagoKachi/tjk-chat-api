import { ICreateAccount } from '@domain/models/account/account';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface CreateAccountValidator {
  validate (data: ICreateAccount): void | ValidationError
}
