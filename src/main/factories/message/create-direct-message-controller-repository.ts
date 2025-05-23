import { DbCreateDirectMessage } from '@data/usecases/message/create-message';
import { CryptoAdapter } from '@infra/criptography/cryptojs-adapter';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { MessageMongoRepository } from '@infra/db/mongodb/repositories/message-mongo-respository';
import { CreateDirectMessageValidatorAdapter } from '@infra/validation/message/create-direct-message-validation';
import { CreateDirectMessageController } from '@presentation/controllers/message/create-direct-message-controller';
import { Controller } from '@presentation/protocols';
import { JWT_SECRET } from 'src/utils/constants';

export const makeCreateDirectMessageController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const messageMongoRepository = new MessageMongoRepository();
  const accountMongoRepository = new AccountMongoRepository();
  const cryptoAdapter = new CryptoAdapter(JWT_SECRET!);

  const createMessage = new DbCreateDirectMessage(
    messageMongoRepository,
    conversationRepository,
    accountMongoRepository,
    conversationRepository,
    cryptoAdapter
  );

  const validator = new CreateDirectMessageValidatorAdapter();

  return new CreateDirectMessageController(createMessage, validator);
};
