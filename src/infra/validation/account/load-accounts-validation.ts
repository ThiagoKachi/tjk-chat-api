
import { ValidationError } from '@domain/models/validation-error/validation';
import { ILoadAccounts } from '@domain/usecases/account/load-accounts';
import { LoadAccountsValidator } from '@validation/validators/account/load-accounts-validation';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class LoadAccountsValidatorAdapter implements LoadAccountsValidator {
  private loadAccountsSchema = z.object({
    conversationId: z.string().optional(),
    inGroup: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value === undefined) return true;
          return value === 'true' || value === 'false';
        },
        { message: 'inGroup must be either \'true\' or \'false\'' }
      )
      .transform((value) => {
        if (value === undefined) return undefined;
        return value === 'true';
      }),
  })
    .refine((data) => {
      const bothPresent = data.conversationId !== undefined && data.inGroup !== undefined;
      const bothAbsent = data.conversationId === undefined && data.inGroup === undefined;
      return bothPresent || bothAbsent;
    }, {
      message: 'conversationId and inGroup must be provided together',
    });

  validate ({ conversationId, inGroup }: ILoadAccounts): void | ValidationError {
    const result = this.loadAccountsSchema.safeParse({ conversationId, inGroup });

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
