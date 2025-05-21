import { ValidationError } from '@domain/models/validation-error/validation';
import { LoadMessagesByConversationValidator } from '@validation/validators/message/load-messages-by-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class LoadMessagesByConversationValidatorAdapter implements LoadMessagesByConversationValidator {
  private loadMessagesByConversationSchema = z.object({
    conversationId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid objectId format'),
  });


  validate (conversationId: string): void | ValidationError {
    const result = this.loadMessagesByConversationSchema.safeParse(conversationId);

    if (!result.success) {
      const validationError = fromZodError(result.error);
      return {
        success: false,
        name: 'ValidationError',
        message: validationError.message,
        error: {
          issues: result.error.issues
        }
      };
    }
  }
}
