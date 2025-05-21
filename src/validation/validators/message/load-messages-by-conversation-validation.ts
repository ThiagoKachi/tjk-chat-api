import { IMessageListProps } from '@domain/models/message/message-list';
import { ValidationError } from '@domain/models/validation-error/validation';

export interface LoadMessagesByConversationValidator {
  validate ({
    conversationId,
    pageSize,
    offset
  }: IMessageListProps): void | ValidationError
}
