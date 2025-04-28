import { ValidationError } from '@domain/models/validation-error/validation';
import { AuthenticationModel } from '@domain/usecases/account/authentication';

export interface AuthenticationValidator {
  validate (data: AuthenticationModel): void | ValidationError
}
