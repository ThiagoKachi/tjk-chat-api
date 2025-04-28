import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeAuthenticationController } from '@main/factories/account/authentication-controller-repository';
import { makeCreateAccountController } from '@main/factories/account/create-account-controller-repository';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/accounts', adaptRoute(makeCreateAccountController()));
  router.post('/auth', adaptRoute(makeAuthenticationController()));
};
