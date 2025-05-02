import { AddFavoriteContact } from '@domain/usecases/account/add-favorite-contact';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { AddFavoriteContactValidator } from '@validation/validators/account/add-favorite-contact-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class AddFavoriteContactController implements Controller {
  constructor (
    private readonly addFavoriteContact: AddFavoriteContact,
    private readonly validation: AddFavoriteContactValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const { contactId } = httpRequest.body;
      const { accountId } = httpRequest;

      await this.addFavoriteContact.addFavorite(accountId!, contactId);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
