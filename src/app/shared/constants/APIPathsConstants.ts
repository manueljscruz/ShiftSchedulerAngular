export const BASE_API_URL: string = "http://localhost:5265/api/";
// Home
export const GET_HOME_VIEW_MODEL_URL : string = BASE_API_URL + "Home/get-home-view-model/{lcode}";

// Gender
export const GET_GENDERS_BY_LOCALIZATION_URL : string = BASE_API_URL + "gender/get-all-genders-by-localization/{lcode}";

//#region AUTH & USER
export const LOGIN_URL : string = BASE_API_URL + "Auth/login";
export const REGISTER_URL : string = BASE_API_URL + "user/register";
export const UPDATE_USER_URL : string = BASE_API_URL + "user/update";

// EntityType

export const GET_ENTITY_TYPES_BY_LOCALIZATION_URL : string = BASE_API_URL + "EntityType/get-all-entity-types-by-localization/{lcode}";

//#region ENTITY
const ENTITY_CONTROLLER: string = "Entity";
export const ADD_ENTITY_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/add";
export const GET_ENTITIES_BY_WORKER_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entities-by-worker-id/{workerId}";
export const GET_ENTITY_MEMBERS_VM : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entities-members-view-model";
export const GET_ENTITY_MEMBERS_PAGINATION : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entity-members-pagination";
export const GET_ENTITY_PROFILE_VM : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entity-profile-view-model";
export const GET_ENTITY_SKILLS : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entity-skills";
export const UPDATE_ENTITY_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/update";
export const DELETE_ENTITY_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/delete-by-id";
export const ADD_NEW_ENTITY_MEMBER_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/add-new-entity-member";
export const UPDATE_ENTITY_MEMBER_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/update-entity-member";
export const DELETE_ENTITY_MEMBER_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/delete-entity-member";

//#region SHIFT
const SHIFT_CONTROLLER : string = "Shift";
export const GET_ENTITY_SHIFT_VIEW_MODEL_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/get-entity-shift-view-model";
export const GET_ENTITY_SHIFTS : string = BASE_API_URL + SHIFT_CONTROLLER + "/get-entity-shifts";
export const ADD_SHIFT_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/add-entity-shift";
export const ADD_SHIFT_BREAK_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/add-entity-shift-break";
export const UPDATE_SHIFT_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/update-entity-shift";
export const UPDATE_SHIFT_BREAK_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/update-entity-shift-break";
export const DELETE_SHIFT_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/delete-entity-shift";
export const DELETE_SHIFT_BREAK_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/delete-entity-shift-break";
export const ADD_SHIFT_ROTATION_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/add-shift-rotation";
export const UPDATE_SHIFT_ROTATION_ORDER_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/update-shift-rotation-order";
export const UPDATE_SHIFT_ROTATION_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/update-shift-rotation";
export const DELETE_SHIFT_ROTATION_URL : string = BASE_API_URL + SHIFT_CONTROLLER + "/delete-shift-rotation";

//#region RULES
const ENTITY_RULES_CONTROLLER: string = "EntityRule";
export const GET_ENTITY_RULES_VIEW_MODEL_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/get-entity-rules-view-model";
export const ADD_RULE_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/add-entity-rule";
export const ADD_RULE_SPEC_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/add-entity-rule-spec";
export const UPDATE_RULE_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/update-entity-rule";
export const UPDATE_RULE_SPEC_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/update-entity-rule-spec";
export const DELETE_RULE_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/delete-entity-rule";
export const DELETE_RULE_SPEC_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/delete-entity-rule-spec";
export const DELETE_RULE_SPECS_URL : string = BASE_API_URL + ENTITY_RULES_CONTROLLER + "/delete-entity-rule-specs";

//#region ABSENCE
const ENTITY_WORKER_ABSENCES_CONTROLLER = "EntityWorkerAbsence";
export const GET_ENTITY_ABSENCES_VIEW_MODEL_URL : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/get-entity-worker-absence-model";
export const GET_ENTITY_ABSENCES_PAGINATION : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/get-entity-worker-absences-pagination";
export const ADD_ENTITY_ABSENCE_URL : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/add-entity-worker-absence";
export const UPDATE_ENTITY_ABSENCE_URL : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/update-entity-worker-absence";
export const DELETE_ENTITY_ABSENCE_URL : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/delete-entity-worker-absence";
export const ENTITY_ABSENCE_APPROVAL_DECISION_URL : string = BASE_API_URL + ENTITY_WORKER_ABSENCES_CONTROLLER + "/absence-approval-decision";

//#region ENTITY SCHEDULE
const ENTITY_SCHEDULE_CONTROLLER : string = "EntitySchedule";
export const GET_ENTITY_SCHEDULE_VIEW_MODEL_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/get-entity-schedule-view-model";
export const GENERATE_ENTITY_SCHEDULE : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/generate-entity-schedule";
export const ASSIGN_ENTRY_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/assign-entry";
export const GET_ENTITY_SCHEDULES_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/get-entity-schedules";
export const APPLY_ROTATION_CYCLE_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/apply-rotation-cycle";