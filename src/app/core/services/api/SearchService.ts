import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_ENTITY_PUBLIC_PROFILE_URL, GET_WORKER_PUBLIC_PROFILE_URL, SEARCH_URL } from '../../../shared/constants/APIPathsConstants';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { LanguageServiceService } from '../language-service.service';
import { SearchRequestDTO } from '../../../shared/models/DTOs/Outgoing/SearchRequestDTO';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';

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

        try {
            const apiResponse = await this.http.post(SEARCH_URL, searchRequest).toPromise();
            return apiResponse as BaseResponseModel;
        } catch (error: any) {
            console.error('Error performing search:', error.message);
            response.message = error.message;
        }

        return response;
    }

    /**
     * Retrieves the public profile of a worker.
     * @param workerId - The unique identifier of the worker.
     * @returns A promise that resolves to the worker's public profile.
     */
    async getWorkerPublicProfile(workerId: string): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try {
            const url = GET_WORKER_PUBLIC_PROFILE_URL;
            let request = new BaseViewModelRequestDTO('', workerId);

            const apiResponse = await this.http.post(url, request).toPromise();
            return apiResponse as BaseResponseModel;
        } catch (error: any) {
            console.error('Error fetching worker profile:', error.message);
            response.message = error.message;
        }

        return response;
    }

    /**
     * Retrieves the public profile of an entity.
     * @param entityId - The unique identifier of the entity.
     * @returns A promise that resolves to the entity's public profile.
     */
    async getEntityPublicProfile(entityId: string): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        const request = new BaseViewModelRequestDTO(entityId, '');

        try {
            const apiResponse = await this.http.post(GET_ENTITY_PUBLIC_PROFILE_URL, request).toPromise();
            return apiResponse as BaseResponseModel;
        } catch (error: any) {
            console.error('Error fetching entity profile:', error.message);
            response.message = error.message;
        }

        return response;
    }
}
