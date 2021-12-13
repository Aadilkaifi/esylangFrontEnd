export class BaseResponse<T> {
  data: Array<T>;
  status: number;
  code: number;
  message: string;
}
