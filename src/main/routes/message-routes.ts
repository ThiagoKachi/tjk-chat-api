import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeCreateDirectMessageController } from '@main/factories/message/create-direct-message-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/message', auth, adaptRoute(makeCreateDirectMessageController()));
};
