import { EntityDTO } from "../DTOs/Incoming/EntityDTO";
import { EntityTypeLocalizedDTO } from "../DTOs/Incoming/EntityTypeLocalizedDTO";

export class EntityProfileViewModel{
    entityDTO : EntityDTO;
    allowEdit: boolean;
    entityTypeLocalizeds : EntityTypeLocalizedDTO[];

    constructor(entityDTO : EntityDTO, allowEdit: boolean, entityTypeLocalizeds : EntityTypeLocalizedDTO[]){
        this.entityDTO = entityDTO;
        this.allowEdit = allowEdit;
        this.entityTypeLocalizeds = entityTypeLocalizeds;
    }
}