export class Pagination<T> {
  page: number;
  size: number;
  totalCount: number;
  totalPage: number;
  isLast: boolean;
  // pageable?: {
  // offset?: number; //하나의 페이지에서 보여질 엘리먼트의 수
  // };
  items: T[];

  constructor(totalCount: number, page: number, size: number, items: T[], offset?: number) {
    this.page = page;
    this.size = size;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / size);
    this.isLast = this.totalPage <= page;
    // this.pageable.offset = offset;
    this.items = items;
  }
}
