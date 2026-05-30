export interface AdminUpsertLocalizationDTO {
    localizationId: number;
    displayValue: string;
}

export interface AdminUpsertTypeDTO {
    id: number;
    internalName: string;
    hexBGColor?: string;
    hexFontColor?: string;
    localizations: AdminUpsertLocalizationDTO[];
}
