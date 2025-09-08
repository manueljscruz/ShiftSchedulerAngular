export class PagedList<T> {

    data: T[] = [];
    currentPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPages: number = this.totalCount > 0 ? Math.ceil(this.totalCount / this.pageSize) : 0;
    isPreviousPageExists: boolean = this.currentPage > 1;
    isNextPageExists: boolean = this.currentPage < this.totalPages;

    /**
     *
     */
    constructor(data: T[], currentPage: number, pageSize: number, totalCount: number) {
        this.data = data;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
    }

    static Empty<T>(pageSize: number = 10): PagedList<T> {
        return new PagedList<T>([], 1, pageSize, 0);
    }
}