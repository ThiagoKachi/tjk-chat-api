
import { AccountStatus } from '@domain/models/account/account';
import { ValidationError } from '@domain/models/validation-error/validation';
import { ChangeStatusValidator } from '@validation/validators/account/change-status-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ChangeStatusValidatorAdapter implements ChangeStatusValidator {
  private changeStatusSchema = z.object({
    status: z.enum(['online', 'offline', 'away']),
  });

  validate (data: AccountStatus): void | ValidationError {
    const result = this.changeStatusSchema.safeParse(data);

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
