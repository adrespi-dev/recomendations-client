export type PaginationParams = {
  page: number;
  page_size?: number;
};

export type PaginatedResult<T> = {
  count: number;
  results: T[];
};
