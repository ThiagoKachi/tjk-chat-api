import { ValidationError } from '@domain/models/validation-error/validation';
import { RemoveMessageValidator } from '@validation/validators/message/remove-message-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class RemoveMessageValidatorAdapter implements RemoveMessageValidator {
  private removeMessageSchema = z
    .string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid objectId format');

  validate(messageId: string): void | ValidationError {
    const result = this.removeMessageSchema.safeParse(messageId);

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
