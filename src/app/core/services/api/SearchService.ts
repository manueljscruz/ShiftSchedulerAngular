import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SEARCH_URL } from '../../../shared/constants/APIPathsConstants';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { LanguageServiceService } from '../language-service.service';
import { SearchRequestDTO } from '../../../shared/models/DTOs/Outgoing/SearchRequestDTO';
import { PagedList } from '../../../shared/models/DTOs/Incoming/PagedList';
import { SearchResultDTO } from '../../../shared/models/DTOs/Incoming/SearchResultDTO';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private http: HttpClient,
        private languageService: LanguageServiceService
    ) {}

    /**
     * Performs a global search across workers and entities.
     * @param searchRequest - The search request parameters.
     * @returns A promise that resolves to the paginated search results.
     */
    async search(searchRequest: SearchRequestDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);
        searchRequest.languageCode = this.languageService.returnLocalization();

        try {
            const apiResponse = await this.http.post(SEARCH_URL, searchRequest).toPromise();
            return apiResponse as BaseResponseModel;
        } catch (error: any) {
            console.error('Error performing search:', error.message);
            response.message = error.message;
        }

        return response;
    }
}
