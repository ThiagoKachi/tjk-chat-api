export type HttpResponse = {
  statusCode: number;
  body: any;
}

export type HttpRequest = {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  accountId?: string;
}
