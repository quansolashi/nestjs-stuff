export interface IPaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    page: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
