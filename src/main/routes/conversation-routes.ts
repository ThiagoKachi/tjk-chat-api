import { adaptRoute } from '@main/adapters/express-route-adapter';
import { makeAddUserToGroupConversationController } from '@main/factories/conversation/add-user-to-group-conversation.controller.repository';
import { makeCreateConversationController } from '@main/factories/conversation/create-conversation-controller-repository';
import { makeCreateGroupConversationController } from '@main/factories/conversation/create-group-conversation-controller-repository';
import { makeLoadConversationsController } from '@main/factories/conversation/load-conversations-controller-repository';
import { makeRemoveConversationController } from '@main/factories/conversation/remove-conversation-controller-repository';
import { auth } from '@main/middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.get('/conversation', auth, adaptRoute(makeLoadConversationsController()));
  router.post('/conversation', auth, adaptRoute(makeCreateConversationController()));
  router.delete('/conversation/:conversationId', auth, adaptRoute(makeRemoveConversationController()));
  router.post('/conversation-group', auth, adaptRoute(makeCreateGroupConversationController()));
  router.post('/conversation-group/add', auth, adaptRoute(makeAddUserToGroupConversationController()));
};
