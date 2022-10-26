import { IPaginationResult } from '../interfaces';

export type PaginationOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginationOptions,
) => Promise<IPaginationResult<T>>;
