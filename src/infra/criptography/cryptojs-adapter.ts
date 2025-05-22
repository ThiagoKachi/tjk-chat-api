import { MessageDecrypter } from '@data/protocols/criptography/message-decrypter';
import { MessageEncrypter } from '@data/protocols/criptography/message-encrypter';
import CryptoJS from 'crypto-js';

export class CryptoAdapter implements MessageDecrypter, MessageEncrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const encrypted = CryptoJS.AES.encrypt(value, this.secret).toString();
    return encrypted;
  }

  async decrypt(encryptedText: string): Promise<string> {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.secret);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error('Decryption failed');
    }

    return decrypted;
  }
}
