import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
    ADMIN_TYPES_GET_ALL_URL,
    ADMIN_TYPES_GET_BY_ID_URL,
    ADMIN_TYPES_UPSERT_URL,
    ADMIN_TYPES_DELETE_URL
} from '../../../../shared/constants/APIPathsConstants';
import { AdminTypeItemDTO } from '../../../../shared/models/DTOs/admin/AdminTypeItemDTO';
import { AdminUpsertTypeDTO } from '../../../../shared/models/DTOs/admin/AdminUpsertTypeDTO';

export interface AdminTypeListResponse {
    hasColors: boolean;
    items: AdminTypeItemDTO[];
}

@Injectable({ providedIn: 'root' })
export class AdminTypeService {

    constructor(private http: HttpClient) {}

    async getAll(typeKey: string): Promise<AdminTypeListResponse> {
        const url = ADMIN_TYPES_GET_ALL_URL.replace('{typeKey}', typeKey);
        try {
            const result = await firstValueFrom(
                this.http.get<AdminTypeListResponse>(url)
            );
            return result ?? { hasColors: false, items: [] };
        } catch (error: any) {
            console.error(`Error fetching type ${typeKey}:`, error.message);
            return { hasColors: false, items: [] };
        }
    }

    async getById(typeKey: string, id: number): Promise<AdminTypeItemDTO | null> {
        const url = ADMIN_TYPES_GET_BY_ID_URL
            .replace('{typeKey}', typeKey)
            .replace('{id}', id.toString());
        try {
            return await firstValueFrom(this.http.get<AdminTypeItemDTO>(url));
        } catch (error: any) {
            console.error(`Error fetching ${typeKey} id=${id}:`, error.message);
            return null;
        }
    }

    async upsert(typeKey: string, dto: AdminUpsertTypeDTO): Promise<number> {
        const url = ADMIN_TYPES_UPSERT_URL.replace('{typeKey}', typeKey);
        try {
            const result = await firstValueFrom(
                this.http.post<{ id: number }>(url, dto)
            );
            return result?.id ?? 0;
        } catch (error: any) {
            console.error(`Error upserting ${typeKey}:`, error.message);
            return 0;
        }
    }

    async delete(typeKey: string, id: number): Promise<boolean> {
        const url = ADMIN_TYPES_DELETE_URL
            .replace('{typeKey}', typeKey)
            .replace('{id}', id.toString());
        try {
            await firstValueFrom(this.http.delete(url));
            return true;
        } catch (error: any) {
            console.error(`Error deleting ${typeKey} id=${id}:`, error.message);
            return false;
        }
    }
}
