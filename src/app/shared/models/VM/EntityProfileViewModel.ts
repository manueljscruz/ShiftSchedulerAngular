import { EntityDTO } from "../DTOs/Incoming/EntityDTO";
import { EntityTypeLocalizedDTO } from "../DTOs/Incoming/EntityTypeLocalizedDTO";
import { Entity } from "../database/entity";

export class EntityProfileViewModel{
    entityDTO : EntityDTO;
    allowEdit: boolean;
    allowDelete: boolean;
    entityTypeLocalizeds : EntityTypeLocalizedDTO[];
    childrenEntities: Entity[];
    parentEntity: Entity | null;

    constructor(entityDTO : EntityDTO, allowEdit: boolean, entityTypeLocalizeds : EntityTypeLocalizedDTO[], childrenEntities: Entity[] = [], parentEntity: Entity | null = null){
        this.entityDTO = entityDTO;
        this.allowEdit = allowEdit;
        this.allowDelete = false;
        this.entityTypeLocalizeds = entityTypeLocalizeds;
        this.childrenEntities = childrenEntities;
        this.parentEntity = parentEntity;
    }
}