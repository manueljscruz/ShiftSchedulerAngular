import exp from "constants";
import { environment } from "../../../environments/environment";

export const BASE_API_URL: string = environment.apiUrl;
// Home
export const GET_HOME_VIEW_MODEL_URL : string = BASE_API_URL + "Home/get-home-view-model/{lcode}";

// Gender
export const GET_GENDERS_BY_LOCALIZATION_URL : string = BASE_API_URL + "gender/get-all-genders-by-localization/{lcode}";

//#region AUTH & USER
export const LOGIN_URL : string = BASE_API_URL + "Auth/login";
export const REFRESH_TOKEN_URL : string = BASE_API_URL + "Auth/refresh-token";
export const LOGOUT_URL : string = BASE_API_URL + "Auth/logout";
export const FORGOT_PASSWORD_URL : string = BASE_API_URL + "Auth/forgot-password";
export const RESET_PASSWORD_URL : string = BASE_API_URL + "Auth/reset-password";
export const REGISTER_URL : string = BASE_API_URL + "user/register";
export const CONFIRM_EMAIL_URL : string = BASE_API_URL + "user/confirm-email";
export const RESEND_CONFIRMATION_EMAIL_URL : string = BASE_API_URL + "Auth/resend-confirmation-email";
export const CHANGE_PASSWORD_URL : string = BASE_API_URL + "Auth/change-password";
export const UPDATE_USER_URL : string = BASE_API_URL + "user/update";

// EntityType

export const GET_ENTITY_TYPES_BY_LOCALIZATION_URL : string = BASE_API_URL + "EntityType/get-all-entity-types-by-localization/{lcode}";

//#region ENTITY
const ENTITY_CONTROLLER: string = "Entity";
export const ADD_ENTITY_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/add";
export const GET_ENTITY_DASHBOARD_VM_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-entity-dashboard-view-model";
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
export const CONVERT_BOT_TO_USER_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/convert-bot-to-user";
export const UPDATE_MEMBER_PERMISSION_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/update-member-permission";
export const GET_PENDING_INVITATIONS_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/pending-invitations/{workerId}";
export const ACCEPT_INVITATION_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/accept-invitation";
export const DECLINE_INVITATION_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/decline-invitation";
export const GET_UMBRELLA_ENTITIES_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/get-umbrella/{entityId}";
export const TRANSFER_COPY_MEMBERS_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/transfer-copy-members";
export const GET_IMPORT_CANDIDATES_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/import-candidates/{entityId}";
export const IMPORT_CONFIG_URL : string = BASE_API_URL + ENTITY_CONTROLLER + "/import-config";
export const SET_MEMBER_DATE_TO_EXIT_URL: string = BASE_API_URL + ENTITY_CONTROLLER + '/set-member-date-to-exit';
export const CANCEL_MEMBER_EXIT_URL: string = BASE_API_URL + ENTITY_CONTROLLER + '/cancel-member-exit';

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

//#region SHIFT TEMPLATE
const SHIFT_TEMPLATE_CONTROLLER : string = "ShiftTemplate";
export const UPDATE_SHIFT_TEMPLATE_POP_COUNT_URL : string = BASE_API_URL + SHIFT_TEMPLATE_CONTROLLER + "/update-shift-template-pop-count/{shiftTemplateId}";
export const UPDATE_SHIFT_BREAK_TEMPLATE_POP_COUNT_URL : string = BASE_API_URL + SHIFT_TEMPLATE_CONTROLLER + "/update-shift-break-template-pop-count/{shiftBreakTemplateId}";

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
export const DELETE_WORKER_SCHEDULE_ENTRIES_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/delete-worker-schedule-entries";
export const DELETE_SCHEDULE_ENTRIES_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/delete-schedule-entries";
export const APPLY_ROTATION_CYCLE_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/apply-rotation-cycle";
export const ADD_SCHEDULE_ENTRY_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/add-schedule-entry";
export const SAVE_SCHEDULE_ENTRY_URL : string = BASE_API_URL + ENTITY_SCHEDULE_CONTROLLER + "/save-schedule-entries";

//#region SEARCH
const SEARCH_CONTROLLER: string = "Search";
export const SEARCH_URL: string = BASE_API_URL + SEARCH_CONTROLLER + "/search";
export const GET_WORKER_PUBLIC_PROFILE_URL: string = BASE_API_URL + SEARCH_CONTROLLER + "/worker";
export const GET_ENTITY_PUBLIC_PROFILE_URL: string = BASE_API_URL + SEARCH_CONTROLLER + "/entity";

//#region HOLIDAY
const HOLIDAY_CONTROLLER: string = "Holiday";
export const GET_ENTITY_HOLIDAYS_VIEW_MODEL_URL: string = BASE_API_URL + HOLIDAY_CONTROLLER + "/get-entity-holidays-view-model";
export const GET_ENTITY_HOLIDAYS_PAGINATION: string = BASE_API_URL + HOLIDAY_CONTROLLER + "/entity-holiday/get-by-pagination";
export const ADD_ENTITY_HOLIDAY_URL: string = BASE_API_URL + HOLIDAY_CONTROLLER + "/entity-holiday/add";
export const UPDATE_ENTITY_HOLIDAY_URL: string = BASE_API_URL + HOLIDAY_CONTROLLER + "/entity-holiday/update";
export const DELETE_ENTITY_HOLIDAY_URL: string = BASE_API_URL + HOLIDAY_CONTROLLER + "/entity-holiday/delete";

//#region NOTIFICATION
const NOTIFICATION_CONTROLLER: string = "Notification";
export const GET_MY_NOTIFICATIONS_URL: string = BASE_API_URL + NOTIFICATION_CONTROLLER + "/my";
export const GET_UNREAD_COUNT_URL: string = BASE_API_URL + NOTIFICATION_CONTROLLER + "/unread-count";
export const MARK_NOTIFICATION_READ_URL: string = BASE_API_URL + NOTIFICATION_CONTROLLER + "/mark-read";
export const MARK_ALL_READ_URL: string = BASE_API_URL + NOTIFICATION_CONTROLLER + "/mark-all-read";


//#region ADMIN
const LOCALIZATION_CONTROLLER: string = "Localization";
export const GET_ALL_LOCALIZATIONS_URL: string = BASE_API_URL + LOCALIZATION_CONTROLLER + "/get-all";

const ADMIN_TYPES_CONTROLLER: string = "AdminTypes";
export const ADMIN_TYPES_GET_ALL_URL: string = BASE_API_URL + ADMIN_TYPES_CONTROLLER + "/{typeKey}";
export const ADMIN_TYPES_GET_BY_ID_URL: string = BASE_API_URL + ADMIN_TYPES_CONTROLLER + "/{typeKey}/{id}";
export const ADMIN_TYPES_UPSERT_URL: string = BASE_API_URL + ADMIN_TYPES_CONTROLLER + "/{typeKey}";
export const ADMIN_TYPES_DELETE_URL: string = BASE_API_URL + ADMIN_TYPES_CONTROLLER + "/{typeKey}/{id}";
export const GET_ADMIN_DASHBOARD_URL: string = BASE_API_URL + "Home/admin-dashboard";

// Admin complex entity managers
export const ADMIN_HOLIDAY_BEHAVIOURS_URL: string = BASE_API_URL + "AdminHolidayBehaviours";
export const ADMIN_RULE_TYPES_URL: string = BASE_API_URL + "AdminRuleTypes";
export const ADMIN_HOLIDAY_CATALOGS_URL: string = BASE_API_URL + "AdminHolidayCatalogs";
export const ADMIN_NOTIFICATION_TYPES_URL: string = BASE_API_URL + "AdminNotificationTypes";
export const ADMIN_SUBSCRIPTION_PLAN_TYPES_URL: string = BASE_API_URL + "AdminSubscriptionPlanTypes";
export const ADMIN_SUBSCRIPTION_DURATION_TYPES_URL: string = BASE_API_URL + "AdminSubscriptionDurationTypes";
export const ADMIN_PAYMENT_METHOD_TYPES_URL: string = BASE_API_URL + "AdminPaymentMethodTypes";
export const ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL: string = BASE_API_URL + "AdminSubscriptionPlanDurationPrices";
export const ADMIN_CAMPAIGNS_URL: string = BASE_API_URL + "AdminCampaigns";

//#endregion

//#region BILLING
export const ENTITY_BILLING_URL: string = BASE_API_URL + "EntityBilling";
