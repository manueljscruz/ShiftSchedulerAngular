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
        const userLanguage = navigator.language;

        try {
            let url = this.baseUrl + this.getGenderListURL + userLanguage;

            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            console.log('Data received:', data);
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}