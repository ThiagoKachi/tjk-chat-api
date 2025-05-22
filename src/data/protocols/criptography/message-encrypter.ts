export interface MessageEncrypter {
  encrypt (value: string): Promise<string>
}
