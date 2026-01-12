import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_GENDERS_BY_LOCALIZATION_URL, GET_ENTITY_TYPES_BY_LOCALIZATION_URL, GET_HOME_VIEW_MODEL_URL } from '../../../shared/constants/APIPathsConstants';
import { LanguageServiceService } from '../language-service.service';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    
    constructor(private http: HttpClient,
        private languageService: LanguageServiceService
    ) {}

    async getHomeViewModel() : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();

        try {
            let url = GET_HOME_VIEW_MODEL_URL.replace('{lcode}', userLanguage);
            const response = await this.http.get(url).toPromise();
            return response;
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
        }
    }

    async getGenders() : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();

        try {
            let url = GET_GENDERS_BY_LOCALIZATION_URL.replace('{lcode}', userLanguage);
            const response = await this.http.get(url).toPromise();
            return response;
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
        }
    }

    async getEntityTypes() : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();

        try {
            let url = GET_ENTITY_TYPES_BY_LOCALIZATION_URL.replace('{lcode}', userLanguage);
            const response = await this.http.get(url).toPromise();
            return response;
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
        }
    }
}