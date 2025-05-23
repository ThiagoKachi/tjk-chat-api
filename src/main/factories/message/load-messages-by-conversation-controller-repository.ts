import { DbLoadMessagesByConversation } from '@data/usecases/message/load-messages-by-conversation';
import { CryptoAdapter } from '@infra/criptography/cryptojs-adapter';
import { ConversationMongoRepository } from '@infra/db/mongodb/repositories/conversation-mongo-repository';
import { MessageMongoRepository } from '@infra/db/mongodb/repositories/message-mongo-respository';
import { LoadMessagesByConversationValidatorAdapter } from '@infra/validation/message/load-messages-by-conversation-validation';
import { LoadMessagesByConversationController } from '@presentation/controllers/message/load-messages-by-conversation-controller';
import { Controller } from '@presentation/protocols';
import { JWT_SECRET } from 'src/utils/constants';

export const makeLoadMessagesByConversationController = (): Controller => {
  const conversationRepository = new ConversationMongoRepository();
  const messageMongoRepository = new MessageMongoRepository();
  const cryptoAdapter = new CryptoAdapter(JWT_SECRET!);

  const loadMessagesByConversation = new DbLoadMessagesByConversation(
    messageMongoRepository,
    conversationRepository,
    cryptoAdapter
  );

  const validator = new LoadMessagesByConversationValidatorAdapter();

  return new LoadMessagesByConversationController(loadMessagesByConversation, validator);
};
