export class Page<T> {
  pageSise: number; // 한 페이지 당 보여지는 게시판 개수
  totalElement: number; // 전체 게시판 개수
  totalPage: number; // 전체 페이지수
  first: boolean; //첫번째 페이지(1페이지만 있을경우 false)
  last: boolean; //마지막 페이지(1페이지만 있을경우 true)
  currentPage: number;
  items: T[];

  constructor(totalElement: number, pageSize: number, currentPage: number, items: T[]) {
    this.pageSise = pageSize;
    this.totalElement = totalElement;
    this.totalPage = Math.ceil(totalElement / pageSize);
    this.first = Math.ceil(totalElement / pageSize) === 1 ? false : currentPage > 1 ? true : false;
    // this.last = // 1페이지 일때 , 마지막 페이지일 때 true
    this.items = items;
  }
}
