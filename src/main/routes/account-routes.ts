import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeAddFavoriteContactController } from '@main/factories/account/add-favorite-contact-controller-repository';
import { makeAuthenticationController } from '@main/factories/account/authentication-controller-repository';
import { makeChangeStatusController } from '@main/factories/account/change-account-controller-repository';
import { makeCreateAccountController } from '@main/factories/account/create-account-controller-repository';
import { makeLoadAccountsController } from '@main/factories/account/load-accounts-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateAccountController()));
  router.post('/signin', adaptRoute(makeAuthenticationController()));
  router.get('/accounts', auth, adaptRoute(makeLoadAccountsController()));
  router.patch('/accounts/status', auth, adaptRoute(makeChangeStatusController()));
  router.post('/accounts/add-favorite', auth, adaptRoute(makeAddFavoriteContactController()));
};
