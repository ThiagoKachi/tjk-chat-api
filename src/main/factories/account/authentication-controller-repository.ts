import { DbAuthentication } from '@data/usecases/account/authentication';
import { BcryptAdapter } from '@infra/criptography/bcrypt-adapter';
import { JwtAdapter } from '@infra/criptography/jwt-adapter';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { AuthenticationValidatorAdapter } from '@infra/validation/account/authentication-validation';
import { AuthenticationController } from '@presentation/controllers/account/authentication-controller';
import { Controller } from '@presentation/protocols';
import { JWT_SECRET, SALT } from 'src/utils/constants';

export const makeAuthenticationController = (): Controller => {
  const hasher = new BcryptAdapter(Number(SALT));
  const encrypter = new JwtAdapter(JWT_SECRET!);
  const accountRepository = new AccountMongoRepository();

  const authentication = new DbAuthentication(
    accountRepository,
    hasher,
    encrypter,
  );

  const validator = new AuthenticationValidatorAdapter();

  return new AuthenticationController(authentication, validator);
};
