import { DbCreateGroupMessage } from '@data/usecases/message/create-group-message';
import { CryptoAdapter } from '@infra/criptography/cryptojs-adapter';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { MessageMongoRepository } from '@infra/db/mongodb/repositories/message-mongo-respository';
import { CreateGroupMessageValidatorAdapter } from '@infra/validation/message/create-group-message-validation';
import { CreateGroupMessageController } from '@presentation/controllers/message/create-group-message-controller';
import { Controller } from '@presentation/protocols';
import { JWT_SECRET } from 'src/utils/constants';

export const makeCreateGroupMessageController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const messageMongoRepository = new MessageMongoRepository();
  const cryptoAdapter = new CryptoAdapter(JWT_SECRET!);

  const createGroupMessage = new DbCreateGroupMessage(
    messageMongoRepository,
    conversationRepository,
    cryptoAdapter
  );

  const validator = new CreateGroupMessageValidatorAdapter();

  return new CreateGroupMessageController(createGroupMessage, validator);
};
