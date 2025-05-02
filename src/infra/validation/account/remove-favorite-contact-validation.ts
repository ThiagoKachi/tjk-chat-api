
import { ValidationError } from '@domain/models/validation-error/validation';
import { RemoveFavoriteContactValidator } from '@validation/validators/account/remove-favorite-contact-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class RemoveFavoriteContactValidatorAdapter implements RemoveFavoriteContactValidator {
  private removeFavoriteContactSchema = z.object({
    contactId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID')
  });

  validate (contactId: string): void | ValidationError {
    const result = this.removeFavoriteContactSchema.safeParse(contactId);

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
