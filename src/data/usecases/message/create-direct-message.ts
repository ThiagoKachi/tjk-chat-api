import { CreateDirectMessageRepository } from '@data/protocols/db/message/create-direct-message';
import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';
import { CreateDirectMessage } from '@domain/usecases/message/create-direct-message';

export class DbCreateDirectMessage implements CreateDirectMessage {
  constructor (
    private readonly createDirectMessageRepository: CreateDirectMessageRepository,
  ) {}

  // Envia uma mensagem direta para outro user
  // Verifica se tem uma conversa entre os dois
  // Se sim: Cria a mensagem com o ID da conversa e preenche a lasMessage da conversa
  // Se não: Cria a conversa com os dois usuários e preenche os campos

  async create(
    userId: string,
    contactId: string,
    messageData: ICreateDirectMessage
  ): Promise<{ id: string }> {
    console.log({  userId, contactId, messageData });
    return { id: '1' };
  }
}
