
import { ICreateDirectConversation } from '@domain/models/conversation/create-direct-conversation';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateDirectConversationValidator } from '@validation/validators/conversation/create-direct-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateDirectConversationValidatorAdapter implements CreateDirectConversationValidator {
  private createDirectConversationSchema = z.object({
    type: z.enum(['group', 'direct']),
    name: z.string().optional(),
    participants: z.array(z.string()).min(1, 'At least one participants are required'),
  });

  validate (data: ICreateDirectConversation): void | ValidationError {
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
