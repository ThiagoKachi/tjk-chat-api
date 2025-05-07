import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface CreateConversationValidator {
  validate (data: ICreateConversation): void | ValidationError
}
