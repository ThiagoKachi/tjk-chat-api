export interface AddFavoriteContact {
  addFavorite (accountId: string, contactId: string): Promise<void>
}
