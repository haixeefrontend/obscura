export interface Pagination<T> {
  pagination: {
    current_page: number
    page_count: number
    page_size: number
  }
  list: T[]
}

export type Paginative<T> = T & {
  page?: number | string
  pagesize?: number | string
}

export enum ListStatus {
  LOADING = -2,
  NOMORE = -1,
  EMPTY = 0,
  MORE = 1,
}

export class List<T> {
  result: T[] = []
  pagination: Pagination<any>['pagination'] = {
    current_page: 1,
    page_count: 0,
    page_size: 0,
  }
  status: ListStatus = ListStatus.LOADING
  reverse: boolean
  uniId?: keyof T
  getListPage: (
    ...args: any[]
  ) => Promise<Pagination<T> | undefined | false> | undefined | false

  constructor(
    getListPageFun: (
      ...args: any[]
    ) => Promise<Pagination<T> | undefined | false> | undefined | false,
    reverse = false,
    uniId?: keyof T,
  ) {
    this.getListPage = getListPageFun
    this.reverse = reverse
    this.uniId = uniId
  }
  get isLastPage(): boolean {
    return this.pagination.current_page === this.pagination.page_count
  }
  async getFirstPage(): Promise<void> {
    await this.setListPage(1)
  }
  async getNextPage(): Promise<void> {
    if (this.status === ListStatus.MORE) {
      await this.setListPage(this.pagination.current_page + 1)
    }
  }
  async getAllPages(): Promise<void> {
    await this.getFirstPage()
    while (!this.isLastPage) {
      await this.getNextPage()
    }
  }
  async reLoadAllPage(): Promise<void> {
    const currentPage = this.pagination.current_page
    let getPage = 0
    while (getPage < currentPage) {
      getPage++
      await this.setListPage(getPage)
    }
  }
  async setListPage(page: number): Promise<void> {
    this.status = ListStatus.LOADING
    const data = await this.getListPage({ page })
    if (data && data.list && data.pagination) {
      const { list, pagination } = data
      if (pagination.current_page === 1) {
        this.result = list
      } else if (this.reverse) {
        this.result = this._uniqueResult(list.concat(this.result))
      } else {
        this.result = this._uniqueResult(this.result.concat(list))
      }
      this.pagination = pagination
      this.status = this.result.length
        ? pagination.current_page >= pagination.page_count
          ? ListStatus.NOMORE
          : ListStatus.MORE
        : ListStatus.EMPTY
      return
    } else if (page === 1) {
      this.result = []
    }
    this.status = ListStatus.EMPTY
  }
  reset(): void {
    this.result = []
    this.pagination = {
      current_page: 1,
      page_count: 0,
      page_size: 0,
    }
    this.status = ListStatus.LOADING
  }
  _uniqueResult(result: T[]): T[] {
    if (!this.uniId) return result
    const res = new Map()
    return result.filter(
      (item) => !res.has(item[this.uniId!]) && res.set(item[this.uniId!], 1),
    )
  }
}
