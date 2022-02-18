interface RequestMethods {
  get(url: string, params?: object): void
  post(url: string, data?: object): void
}

interface ResponseData {
  data?
  errorCode: string
  msg: string
}
