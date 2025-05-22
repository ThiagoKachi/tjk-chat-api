import { DbRemoveMessage } from '@data/usecases/message/remove-message';
import { MessageMongoRepository } from '@infra/db/mongodb/repositories/message-mongo-respository';
import { RemoveMessageValidatorAdapter } from '@infra/validation/message/remove-message-validation';
import { RemoveMessageController } from '@presentation/controllers/message/remove-message-controller';
import { Controller } from '@presentation/protocols';

export const makeRemoveMessageController = (): Controller => {
  const messageMongoRepository = new MessageMongoRepository();

  const removeMessage = new DbRemoveMessage(
    messageMongoRepository,
    messageMongoRepository,
  );

  const validator = new RemoveMessageValidatorAdapter();

  return new RemoveMessageController(removeMessage, validator);
};
