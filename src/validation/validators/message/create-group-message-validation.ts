import { ICreateMessage } from '@domain/models/message/create-message';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface CreateGroupMessageValidator {
  validate (data: ICreateMessage): void | ValidationError
}
