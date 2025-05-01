
import { Encrypter } from '@data/protocols/criptography/encrypter';
import { HashComparer } from '@data/protocols/criptography/hash-comparer';
import { ChangeStatusRepository } from '@data/protocols/db/account/change-status';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { UserStatus } from '@domain/models/user-status';
import { Authentication, AuthenticationModel } from '@domain/usecases/account/authentication';
import { NotFoundError } from '@presentation/errors/not-found';
import { UnauthorizedError } from '@presentation/errors/unauthorized';

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly changeStatus: ChangeStatusRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<{ accessToken: string }> {
    const account = await this.loadAccountByEmailRepository
      .loadByEmail(authentication.email);

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    const isValid = await this.hashComparer.compare(authentication.password, account.password);

    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = await this.encrypter.encrypt(account.id!);

    await this.changeStatus.change(account.id!, UserStatus.ONLINE);

    return { accessToken };
  }
}
