import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateConversationValidator } from '@validation/validators/conversation/create-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateDirectConversationValidatorAdapter implements CreateConversationValidator {
  private createDirectConversationSchema = z.object({
    name: z.string().optional(),
    participants: z.array(z.string()).min(1, 'At least one participants are required').max(1, 'Maximum 2 participants are allowed in a direct conversation'),
  });

  validate (data: ICreateConversation): void | ValidationError {
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
