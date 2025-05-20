import { ICreateMessage } from '@domain/models/message/create-message';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateGroupMessageValidator } from '@validation/validators/message/create-group-message-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateGroupMessageValidatorAdapter implements CreateGroupMessageValidator {
  private createGroupMessageSchema = z.object({
    content: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
    groupId: z.string().min(1, 'Group ID is required'),
    attachments: z.array(z.object({
      url: z.string().url('Invalid URL'),
      type: z.enum(['image', 'file']),
      name: z.string().min(1, 'Name is required'),
      size: z.number().min(1, 'Size must be greater than 0'),
    })).optional(),
  });

  validate (data: ICreateMessage): void | ValidationError {
    const result = this.createGroupMessageSchema.safeParse(data);

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
