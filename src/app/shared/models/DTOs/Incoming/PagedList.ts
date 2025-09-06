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
        /*
        this.totalPages = this.totalCount > 0 ? Math.ceil(this.totalCount / this.pageSize) : 0;
        this.isPreviousPageExists = this.currentPage > 1;
        this.isNextPageExists = this.currentPage < this.totalPages;
        */
    }
}