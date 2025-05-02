export interface RemoveFavoriteContactRepository {
  removeFavorite (accountId: string, contactId: string): Promise<void>;
}
