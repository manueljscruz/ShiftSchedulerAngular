import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_GENDERS_BY_LOCALIZATION_URL, GET_ENTITY_TYPES_BY_LOCALIZATION_URL } from '../../../shared/constants/APIPathsConstants';

@Injectable({
    providedIn: 'root'
})

export class AuxiliaryDataService {
    constructor(private http: HttpClient) {}

    async getGenders() : Promise<any> {
        let userLanguage = navigator.language;
        if(userLanguage.indexOf('-') > 0)
        {
            userLanguage = userLanguage.split('-')[0];
        }

        try {
            let url = GET_GENDERS_BY_LOCALIZATION_URL.replace('{lcode}', userLanguage);

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            else{
                return data;
            }

            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    async getEntityTypes() : Promise<any> {
        let userLanguage = navigator.language;
        if(userLanguage.indexOf('-') > 0)
        {
            userLanguage = userLanguage.split('-')[0];
        }

        try {
            let url = GET_ENTITY_TYPES_BY_LOCALIZATION_URL.replace('{lcode}', userLanguage);

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            else{
                return data;
            }

            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}