import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeCreateDirectMessageController } from '@main/factories/message/create-direct-message-controller-repository';
import { makeCreateGroupMessageController } from '@main/factories/message/create-group-message-controller-repository';
import { makeLoadMessagesByConversationController } from '@main/factories/message/load-messages-by-conversation-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/message', auth, adaptRoute(makeCreateDirectMessageController()));
  router.post('/message/group', auth, adaptRoute(makeCreateGroupMessageController()));
  router.get('/message/:conversationId', auth, adaptRoute(makeLoadMessagesByConversationController()));
};
