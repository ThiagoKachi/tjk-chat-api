import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeCreateConversationController } from '@main/factories/conversation/create-conversation-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/conversation', auth, adaptRoute(makeCreateConversationController()));
};
