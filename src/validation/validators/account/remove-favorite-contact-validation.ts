import { ValidationError } from '@domain/models/validation-error/validation';

export interface RemoveFavoriteContactValidator {
  validate (data: string): void | ValidationError
}
