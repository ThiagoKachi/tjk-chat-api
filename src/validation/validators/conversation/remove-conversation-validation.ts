import { ValidationError } from '@domain/models/validation-error/validation';

export interface RemoveConversationValidator {
  validate (conversationId: string): void | ValidationError
}
