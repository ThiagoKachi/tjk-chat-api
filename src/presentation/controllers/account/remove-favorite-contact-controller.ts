import { RemoveFavoriteContact } from '@domain/usecases/account/remove-favorite-contact';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { RemoveFavoriteContactValidator } from '@validation/validators/account/remove-favorite-contact-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class RemoveFavoriteContactController implements Controller {
  constructor (
    private readonly removeFavoriteContact: RemoveFavoriteContact,
    private readonly validation: RemoveFavoriteContactValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const { contactId } = httpRequest.body;
      const { accountId } = httpRequest;

      await this.removeFavoriteContact.removeFavorite(accountId!, contactId);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
