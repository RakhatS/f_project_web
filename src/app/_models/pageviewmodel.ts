export class PageViewModel<T>{
  dataList: T[] = [];

  countData: number | undefined;

  pageNumber: number = 1;
  totalPages: number | undefined;
  hasPreviousPage: boolean | undefined;
  hasNextPage: boolean | undefined;
}