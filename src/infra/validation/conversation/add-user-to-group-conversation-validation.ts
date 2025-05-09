
import { ValidationError } from '@domain/models/validation-error/validation';
import { AddUserToGroupConversationValidator } from '@validation/validators/conversation/add-user-to-group-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class AddUserToGroupConversationValidatorAdapter implements AddUserToGroupConversationValidator {
  private createDirectConversationSchema = z.object({
    conversationId: z.string().min(1, 'Conversation ID is required'),
    userIds: z.array(z.string()).min(1, 'At least one user ID is required'),
  });

  validate (data: { conversationId: string, userIds: string[] }): void | ValidationError {
    const result = this.createDirectConversationSchema.safeParse(data);

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
