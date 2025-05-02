export interface RemoveFavoriteContact {
  removeFavorite (accountId: string, contactId: string): Promise<void>
}
