
import { ICreateAccount } from '@domain/models/account/account';
import { ValidationError } from '@domain/models/validation-error/validation';
import { CreateAccountValidator } from '@validation/validators/account/auth/create-account-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class CreateAccountValidatorAdapter implements CreateAccountValidator {
  private createAccountSchema = z.object({
    name: z.string().min(3, 'Name is required').max(255),
    email: z.string().min(3, 'Email is required').max(255).email(),
    password: z.string().min(3, 'Password is required').max(255)
  });

  validate (data: ICreateAccount): void | ValidationError {
    const result = this.createAccountSchema.safeParse(data);

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
