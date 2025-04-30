export interface Decrypter {
  decrypt (token: string): Promise<{ id: string }>
}
