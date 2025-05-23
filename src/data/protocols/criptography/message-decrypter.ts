export interface MessageDecrypter {
  decrypt (message: string): Promise<string>
}
