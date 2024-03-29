import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenderService {

    baseUrl = 'https://localhost:7203/api/gender';
    getGenderListURL = '/get-all-genders-by-localization/';

    constructor(private http: HttpClient) {}

    async getGenders() : Promise<any> {
        let userLanguage = navigator.language;
        if(userLanguage.indexOf('-') > 0)
        {
            userLanguage = userLanguage.split('-')[0];
        }

        try {
            let url = this.baseUrl + this.getGenderListURL + userLanguage;

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