import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface CreateDirectMessageValidator {
  validate (data: ICreateDirectMessage): void | ValidationError
}
