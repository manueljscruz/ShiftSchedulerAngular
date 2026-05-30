import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GET_ALL_LOCALIZATIONS_URL } from '../../../../shared/constants/APIPathsConstants';

export interface LocalizationOption {
    localizationId: number;
    localizationCode: string;
}

@Injectable({ providedIn: 'root' })
export class AdminLanguageService {

    private cache: LocalizationOption[] | null = null;

    constructor(private http: HttpClient) {}

    async getAll(): Promise<LocalizationOption[]> {
        if (this.cache) return this.cache;

        try {
            const result = await firstValueFrom(
                this.http.get<LocalizationOption[]>(GET_ALL_LOCALIZATIONS_URL)
            );
            this.cache = result ?? [];
            return this.cache;
        } catch (error: any) {
            console.error('Error fetching localizations:', error.message);
            return [];
        }
    }
}
