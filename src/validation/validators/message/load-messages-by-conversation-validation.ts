import { ValidationError } from '@domain/models/validation-error/validation';

export interface LoadMessagesByConversationValidator {
  validate (conversationId: string): void | ValidationError
}
