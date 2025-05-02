
import { ValidationError } from '@domain/models/validation-error/validation';
import { AuthenticationModel } from '@domain/usecases/account/auth/authentication';
import { AuthenticationValidator } from '@validation/validators/account/auth/authentication-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class AuthenticationValidatorAdapter implements AuthenticationValidator {
  private authenticationSchema = z.object({
    email: z.string().min(3, 'Email is required').max(255).email(),
    password: z.string().min(3, 'Password is required').max(255)
  });

  validate (data: AuthenticationModel): void | ValidationError {
    const result = this.authenticationSchema.safeParse(data);

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
