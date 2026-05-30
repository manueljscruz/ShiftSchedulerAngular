import { AdminLocalizationValueDTO } from './AdminLocalizationValueDTO';

export interface AdminTypeItemDTO {
    id: number;
    internalName: string;
    hexBGColor?: string;
    hexFontColor?: string;
    localizations: AdminLocalizationValueDTO[];
}
