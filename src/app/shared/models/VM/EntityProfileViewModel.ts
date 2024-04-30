import { EntityDTO } from "../DTOs/Incoming/EntityDTO";
import { EntityTypeLocalizedDTO } from "../DTOs/Incoming/EntityTypeLocalizedDTO";

export class EntityProfileViewModel{
    EntityDTO : EntityDTO;
    AllowEdit: boolean;
    EntityTypeLocalizeds : EntityTypeLocalizedDTO[];

    constructor(entityDTO : EntityDTO, allowEdit: boolean, entityTypeLocalizeds : EntityTypeLocalizedDTO[]){
        this.EntityDTO = entityDTO;
        this.AllowEdit = allowEdit;
        this.EntityTypeLocalizeds = entityTypeLocalizeds;
    }
}