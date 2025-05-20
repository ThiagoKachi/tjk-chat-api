import { DbCreateGroupMessage } from '@data/usecases/message/create-group-message';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { MessageMongoRepository } from '@infra/db/mongodb/repositories/message-mongo-respository';
import { CreateGroupMessageValidatorAdapter } from '@infra/validation/message/create-group-message-validation';
import { CreateGroupMessageController } from '@presentation/controllers/message/create-group-message-controller';
import { Controller } from '@presentation/protocols';

export const makeCreateGroupMessageController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const messageMongoRepository = new MessageMongoRepository();

  const createGroupMessage = new DbCreateGroupMessage(
    messageMongoRepository,
    conversationRepository,
  );

  const validator = new CreateGroupMessageValidatorAdapter();

  return new CreateGroupMessageController(createGroupMessage, validator);
};
