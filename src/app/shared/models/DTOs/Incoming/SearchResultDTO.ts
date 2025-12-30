export class SearchResultDTO {
    identifier: string;
    resultType: string;
    title: string;
    typeDisplay: string;
    
    constructor(identifier: string, resultType: string, title: string, typeDisplay: string) {
        this.identifier = identifier;
        this.title = title;
        this.resultType = resultType;
        this.typeDisplay = typeDisplay;
    }
}