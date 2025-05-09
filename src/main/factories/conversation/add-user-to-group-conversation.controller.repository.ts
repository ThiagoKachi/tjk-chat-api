import { DbAddUserToGroupConversation } from '@data/usecases/conversation/add-user-to-group-conversation';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { AddUserToGroupConversationValidatorAdapter } from '@infra/validation/conversation/add-user-to-group-conversation-validation';
import { AddUserToGroupConversationController } from '@presentation/controllers/conversation/add-user-to-group-conversation-controller';
import { Controller } from '@presentation/protocols';

export const makeAddUserToGroupConversationController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const accountMongoRepository = new AccountMongoRepository();

  const addToGroup = new DbAddUserToGroupConversation(
    conversationRepository,
    accountMongoRepository,
    conversationRepository
  );

  const validator = new AddUserToGroupConversationValidatorAdapter();

  return new AddUserToGroupConversationController(addToGroup, validator);
};
