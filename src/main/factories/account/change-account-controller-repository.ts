import { DbChangeStatus } from '@data/usecases/account/change-status';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { ChangeStatusValidatorAdapter } from '@infra/validation/account/change-status-validation';
import { ChangeStatusController } from '@presentation/controllers/account/change-status-controller';
import { Controller } from '@presentation/protocols';

export const makeChangeStatusController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const changeStatus = new DbChangeStatus(accountRepository, accountRepository);
  const validator = new ChangeStatusValidatorAdapter();

  return new ChangeStatusController(changeStatus, validator);
};
