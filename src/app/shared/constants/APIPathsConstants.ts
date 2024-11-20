export const BASE_API_URL: string = "http://localhost:5265/api/";
// Home
export const GET_HOME_VIEW_MODEL_URL : string = BASE_API_URL + "Home/get-home-view-model/{lcode}";

// Gender
export const GET_GENDERS_BY_LOCALIZATION_URL : string = BASE_API_URL + "gender/get-all-genders-by-localization/{lcode}";
// Worker
export const LOGIN_URL : string = BASE_API_URL + "worker/login";
export const REGISTER_URL : string = BASE_API_URL + "worker/add";
export const UPDATE_WORKER_URL : string = BASE_API_URL + "worker/update";
// EntityType
export const GET_ENTITY_TYPES_BY_LOCALIZATION_URL : string = BASE_API_URL + "EntityType/get-all-entity-types-by-localization/{lcode}";
// Entity
export const ADD_ENTITY_URL : string = BASE_API_URL + "Entity/add";
export const GET_ENTITIES_BY_WORKER_URL : string = BASE_API_URL + "Entity/get-entities-by-worker-id/{workerId}";
export const GET_ENTITY_MEMBERS_VM : string = BASE_API_URL + "Entity/get-entities-members-view-model/{entityId}/{lcode}";
export const GET_ENTITY_PROFILE_VM : string = BASE_API_URL + "Entity/get-entity-profile-view-model";
export const GET_ENTITY_SKILLS : string = BASE_API_URL + "Entity/get-entity-skills/{entityId}/{lcode}";
export const UPDATE_ENTITY_URL : string = BASE_API_URL + "Entity/update";
export const DELETE_ENTITY_URL : string = BASE_API_URL + "Entity/delete-by-id/{id}";
export const ADD_NEW_ENTITY_MEMBER_URL : string = BASE_API_URL + "Entity/add-new-entity-member";
export const UPDATE_ENTITY_MEMBER_URL : string = BASE_API_URL + "Entity/update-entity-member";
// Shift
export const GET_ENTITY_SHIFT_VIEW_MODEL_URL : string = BASE_API_URL + "Shift/get-entity-shift-view-model";
export const GET_ENTITY_SHIFTS : string = BASE_API_URL + "Shift/get-entity-shifts/{entityId}";
export const ADD_SHIFT_URL : string = BASE_API_URL + "Shift/add-entity-shift";
export const ADD_SHIFT_BREAK_URL : string = BASE_API_URL + "Shift/add-entity-shift-break";
export const UPDATE_SHIFT_URL : string = BASE_API_URL + "Shift/update-entity-shift";
export const UPDATE_SHIFT_BREAK_URL : string = BASE_API_URL + "Shift/update-entity-shift-break";
export const DELETE_SHIFT_URL : string = BASE_API_URL + "Shift/delete-entity-shift/{entityId}/{shiftId}";
export const DELETE_SHIFT_BREAK_URL : string = BASE_API_URL + "Shift/delete-entity-shift-break/{shiftBreakId}";
// Rules
export const GET_ENTITY_RULES_VIEW_MODEL_URL : string = BASE_API_URL + "EntityRule/get-entity-rules-view-model";
export const ADD_RULE_URL : string = BASE_API_URL + "EntityRule/add-entity-rule";
export const ADD_RULE_SPEC_URL : string = BASE_API_URL + "EntityRule/add-entity-rule-spec";
export const UPDATE_RULE_URL : string = BASE_API_URL + "EntityRule/update-entity-rule";
export const UPDATE_RULE_SPEC_URL : string = BASE_API_URL + "EntityRule/update-entity-rule-spec";
export const DELETE_RULE_URL : string = BASE_API_URL + "EntityRule/delete-entity-rule/{entityId}/{entityRuleId}";
export const DELETE_RULE_SPEC_URL : string = BASE_API_URL + "EntityRule/delete-entity-rule-spec/{entityRuleId}/{specId}";
export const DELETE_RULE_SPECS_URL : string = BASE_API_URL + "EntityRule/delete-entity-rule-specs/{entityRuleId}";
// Absence
export const GET_ENTITY_ABSENCES_VIEW_MODEL_URL : string = BASE_API_URL + "EntityWorkerAbsence/get-entity-worker-absence-model";
export const ADD_ENTITY_ABSENCE_URL : string = BASE_API_URL + "EntityWorkerAbsence/add-entity-worker-absence";
export const UPDATE_ENTITY_ABSENCE_URL : string = BASE_API_URL + "EntityWorkerAbsence/update-entity-worker-absence";
export const DELETE_ENTITY_ABSENCE_URL : string = BASE_API_URL + "EntityWorkerAbsence/delete-entity-worker-absence/{absenceId}";
export const ENTITY_ABSENCE_APPROVAL_DECISION_URL : string = BASE_API_URL + "EntityWorkerAbsence/absence-approval-decision";
// Schedule
export const GET_ENTITY_SCHEDULE_VIEW_MODEL_URL : string = BASE_API_URL + "EntitySchedule/get-entity-schedule-view-model";
export const GET_ENTITY_SCHEDULES : string = BASE_API_URL + "EntitySchedule/get-entity-schedules";