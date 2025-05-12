import { DbRemoveConversation } from '@data/usecases/conversation/remove-conversation';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { RemoveConversationValidatorAdapter } from '@infra/validation/conversation/remove-conversation-validation';
import { RemoveConversationController } from '@presentation/controllers/conversation/remove-conversation-controller';
import { Controller } from '@presentation/protocols';

export const makeRemoveConversationController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();

  const removeConversation = new DbRemoveConversation(
    conversationRepository,
    conversationRepository
  );

  const validator = new RemoveConversationValidatorAdapter();

  return new RemoveConversationController(removeConversation, validator);
};
