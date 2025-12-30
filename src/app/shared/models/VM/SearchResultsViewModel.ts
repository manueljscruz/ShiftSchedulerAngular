import { PagedList } from "../DTOs/Incoming/PagedList";
import { SearchResultDTO } from "../DTOs/Incoming/SearchResultDTO";

export class SearchResultsViewModel {
    resultList: PagedList<SearchResultDTO> = PagedList.Empty<SearchResultDTO>();

    constructor(resultList?: PagedList<SearchResultDTO>) {
    }
}