import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateDirectMessageValidator } from '@validation/validators/message/create-direct-message-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateDirectMessageValidatorAdapter implements CreateDirectMessageValidator {
  private createDirectMessageSchema = z.object({
    content: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
    contactId: z.string().min(1, 'Contact ID is required'),
    attachments: z.array(z.object({
      url: z.string().url('Invalid URL'),
      type: z.enum(['image', 'file']),
      name: z.string().min(1, 'Name is required'),
      size: z.number().min(1, 'Size must be greater than 0'),
    })).optional(),
  });

  validate (data: ICreateDirectMessage): void | ValidationError {
    const result = this.createDirectMessageSchema.safeParse(data);

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
