import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeAddFavoriteContactController } from '@main/factories/account/add-favorite-contact-controller-repository';
import { makeAuthenticationController } from '@main/factories/account/auth/authentication-controller-repository';
import { makeCreateAccountController } from '@main/factories/account/auth/create-account-controller-repository';
import { makeChangeStatusController } from '@main/factories/account/change-account-controller-repository';
import { makeLoadAccountsController } from '@main/factories/account/load-accounts-controller-repository';
import { makeRemoveFavoriteContactController } from '@main/factories/account/remove-favorite-contact-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateAccountController()));
  router.post('/signin', adaptRoute(makeAuthenticationController()));
  router.get('/accounts', auth, adaptRoute(makeLoadAccountsController()));
  router.patch('/accounts/status', auth, adaptRoute(makeChangeStatusController()));
  router.post('/accounts/add-favorite', auth, adaptRoute(makeAddFavoriteContactController()));
  router.post('/accounts/remove-favorite', auth, adaptRoute(makeRemoveFavoriteContactController()));
};
