import { DbCreateDirectConversation } from '@data/usecases/conversation/create-direct-conversationt';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { CreateDirectConversationValidatorAdapter } from '@infra/validation/conversation/create-direct-conversation-validation';
import { CreateDirectConversationController } from '@presentation/controllers/conversation/create-direct-conversation-controller';
import { Controller } from '@presentation/protocols';

export const makeCreateConversationController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const accountMongoRepository = new AccountMongoRepository();

  const createConversation = new DbCreateDirectConversation(
    conversationRepository,
    accountMongoRepository,
    conversationRepository
  );

  const validator = new CreateDirectConversationValidatorAdapter();

  return new CreateDirectConversationController(createConversation, validator);
};
