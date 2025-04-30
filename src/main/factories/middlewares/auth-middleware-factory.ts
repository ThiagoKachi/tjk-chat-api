import { JwtAdapter } from '@infra/criptography/jwt-adapter';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { AuthMiddleware } from '@presentation/middleware/auth-middleware';
import { Middleware } from '@presentation/protocols';

export const makeAuthMiddleware = (): Middleware => {
  const secret = process.env.JWT_SECRET;
  const accountRepository = new AccountMongoRepository();

  const decrypter = new JwtAdapter(secret!);

  return new AuthMiddleware(accountRepository, decrypter);
};
