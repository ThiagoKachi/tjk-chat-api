import { ICreateDirectConversation } from '@domain/models/conversation/create-direct-conversation';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface CreateDirectConversationValidator {
  validate (data: ICreateDirectConversation): void | ValidationError
}
