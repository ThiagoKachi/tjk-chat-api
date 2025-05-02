import { ValidationError } from '@domain/models/validation-error/validation';

export interface AddFavoriteContactValidator {
  validate (data: string): void | ValidationError
}
