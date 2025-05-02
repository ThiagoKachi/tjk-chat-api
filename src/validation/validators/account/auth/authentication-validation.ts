import { ValidationError } from '@domain/models/validation-error/validation';
import { AuthenticationModel } from '@domain/usecases/account/auth/authentication';

export interface AuthenticationValidator {
  validate (data: AuthenticationModel): void | ValidationError
}
