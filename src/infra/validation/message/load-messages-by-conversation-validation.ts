import { IMessageListProps } from '@domain/models/message/message-list';
import { ValidationError } from '@domain/models/validation-error/validation';
import {
  LoadMessagesByConversationValidator,
} from '@validation/validators/message/load-messages-by-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class LoadMessagesByConversationValidatorAdapter
implements LoadMessagesByConversationValidator
{
  private loadMessagesByConversationSchema = z
    .object({
      conversationId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid objectId format'),
      pageSize: z.coerce.number().int().min(1).max(100).optional(),
      offset: z.coerce.number().int().min(0).optional(),
    })
    .refine(
      (data) => {
        const hasPageSize = data.pageSize !== undefined;
        const hasOffset = data.offset !== undefined;
        return hasPageSize === hasOffset;
      },
      {
        message: 'Both pageSize and offset must be provided together',
        path: ['pageSize'],
      }
    );

  validate({
    conversationId,
    pageSize,
    offset,
  }: IMessageListProps): void | ValidationError {
    const result = this.loadMessagesByConversationSchema.safeParse({
      conversationId,
      pageSize,
      offset,
    });

    if (!result.success) {
      const validationError = fromZodError(result.error);
      return {
        success: false,
        name: 'ValidationError',
        message: validationError.message,
        error: {
          issues: result.error.issues,
        },
      };
    }
  }
}
