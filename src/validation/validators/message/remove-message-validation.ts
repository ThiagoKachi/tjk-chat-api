import { ValidationError } from '@domain/models/validation-error/validation';

export interface RemoveMessageValidator {
  validate (messageId: string): void | ValidationError
}
