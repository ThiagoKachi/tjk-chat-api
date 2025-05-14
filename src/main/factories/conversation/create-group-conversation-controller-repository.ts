import { DbCreateGroupConversation } from '@data/usecases/conversation/create-group-conversation';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { CreateGroupConversationValidatorAdapter } from '@infra/validation/conversation/create-group-conversation-validation';
import { CreateGroupConversationController } from '@presentation/controllers/conversation/create-group-conversation-controller';
import { Controller } from '@presentation/protocols';

export const makeCreateGroupConversationController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const accountMongoRepository = new AccountMongoRepository();

  const createGroupConversation = new DbCreateGroupConversation(
    conversationRepository,
    accountMongoRepository,
    conversationRepository
  );

  const validator = new CreateGroupConversationValidatorAdapter();

  return new CreateGroupConversationController(createGroupConversation, validator);
};
