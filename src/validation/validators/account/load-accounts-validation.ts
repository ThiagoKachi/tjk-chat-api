import { ValidationError } from '@domain/models/validation-error/validation';
import { ILoadAccounts } from '@domain/usecases/account/load-accounts';

export interface LoadAccountsValidator {
  validate ({ conversationId, inGroup }: ILoadAccounts): void | ValidationError
}
