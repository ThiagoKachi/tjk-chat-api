export interface MessageDecrypter {
  decrypt (token: string): Promise<string>
}
