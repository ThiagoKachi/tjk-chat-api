
import { ValidationError } from '@domain/models/validation-error/validation';
import { RemoveConversationValidator } from '@validation/validators/conversation/remove-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class RemoveConversationValidatorAdapter implements RemoveConversationValidator {
  private removeConversationSchema = z.object({
    conversationId: z.string({ message: 'conversationId name is required' }),
  });

  validate (conversationId: string): void | ValidationError {
    const result = this.removeConversationSchema.safeParse(conversationId);

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
