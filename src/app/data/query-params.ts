export class QueryParams {
  filters: { [key: string]: any };
  page: number;
  size: number;
  sortBy: string;
  totalElements: number;
  direction: 'asc' | 'desc' |'';

  constructor(
    filters: { [key: string]: any } = {},
    page: number = 0,
    size: number = 5,
    totalElements:number = 0,
    sortBy: string = 'id',
    direction: 'asc' | 'desc' | ''= 'asc'
  ) {
    this.filters = filters;
    this.page = page;
    this.size = size;
    this.sortBy = sortBy;
    this.direction = direction;
    this.totalElements = totalElements;
  }
}
