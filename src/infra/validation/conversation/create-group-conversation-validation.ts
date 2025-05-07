
import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateConversationValidator } from '@validation/validators/conversation/create-conversation-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateGroupConversationValidatorAdapter implements CreateConversationValidator {
  private createGroupConversationSchema = z.object({
    name: z.string({ message: 'Group name is required' }).min(3, 'At least three characters.'),
    participants: z.array(z.string()).min(1, 'At least one participants is required'),
  });

  validate (data: ICreateConversation): void | ValidationError {
    const result = this.createGroupConversationSchema.safeParse(data);

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
