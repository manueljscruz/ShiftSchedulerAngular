export const BASE_API_URL: string = "https://localhost:7203/api/";
// Gender
export const GET_GENDERS_BY_LOCALIZATION_URL : string = BASE_API_URL + "gender/get-all-genders-by-localization/{lcode}";
// Worker
export const LOGIN_URL : string = BASE_API_URL + "worker/login";
export const REGISTER_URL : string = BASE_API_URL + "worker/add";
// EntityType
export const GET_ENTITY_TYPES_BY_LOCALIZATION_URL : string = BASE_API_URL + "EntityType/get-all-entity-types-by-localization/{lcode}";
// Entity
export const ADD_ENTITY_URL : string = BASE_API_URL + "Entity/add";