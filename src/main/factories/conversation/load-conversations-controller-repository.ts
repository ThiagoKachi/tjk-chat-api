import { DbLoadConversations } from '@data/usecases/conversation/load-conversations';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { LoadConversationsController } from '@presentation/controllers/conversation/load-conversations-controller';
import { Controller } from '@presentation/protocols';

export const makeLoadConversationsController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();

  const loadConversations = new DbLoadConversations(
    conversationRepository,
  );

  return new LoadConversationsController(loadConversations);
};
