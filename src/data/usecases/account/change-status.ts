import { ChangeStatusRepository } from '@data/protocols/db/account/change-status';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AccountStatus } from '@domain/models/account/account';
import { ChangeStatus } from '@domain/usecases/account/change-status';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbChangeStatus implements ChangeStatus {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly changeStatusRepository: ChangeStatusRepository
  ) {}

  async change (accountId: string, status: AccountStatus): Promise<void> {
    const account = await this.loadAccountByIdRepository.loadById(accountId);

    if (!account) {
      console.log('Account not found AQUI');
      throw new NotFoundError('Account not found');
    }

    await this.changeStatusRepository.change(accountId, status);
  }
}
