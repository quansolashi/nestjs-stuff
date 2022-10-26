import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../config';
import { PaginateFunction, PaginationOptions } from './types';

export const createPaginator = (
  defaultOptions: PaginationOptions = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
  },
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options.page || defaultOptions.page);
    const perPage = Number(options.perPage || defaultOptions.perPage);

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
