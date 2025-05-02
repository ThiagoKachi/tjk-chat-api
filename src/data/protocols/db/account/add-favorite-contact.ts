export interface AddFavoriteContactRepository {
  addFavorite (accountId: string, contactId: string): Promise<void>;
}
