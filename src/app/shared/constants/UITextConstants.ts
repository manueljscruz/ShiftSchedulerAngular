// General
export const COMPANY_NAME = 'ROOSTER SOFTWARE HOUSE — Unipessoal, Lda';
export const NIF_PLACEHOLDER = 'NIF: 123456789';
export const ADDRESS_PLACEHOLDER = 'Morada: Rua Exemplo 1, Lisboa';
export const COMPANY_EMAIL = 'contact@roostersh.com';
export const COMPANY_PHONE = '+351 912 345 678';
export const COMPANY_COPYRIGHT = '© 2026 '+ COMPANY_NAME;

export const NA = 'N/A';
export const NOT_OWNER_OF_INTANCE_CONTENT = 'You cannot edit this information.';
// Members
export const DELETE_MEMBER_TITLE = 'Delete Member';
export const DELETE_MEMBER_CONTENT = 'Are you sure you want to remove this member?';
export const CONVERT_MEMBER_TITLE = 'Transfer Bot to Member';
export const CONVERT_MEMBER_CONTENT = 'You are about to transfer all skills, assignments, and responsibilities from this {{0}} to a new {{1}}. This action cannot be undone. Do you wish to proceed?';

// Shifts
export const DELETE_SHIFT_BREAK_TITLE = 'Delete Shift Break';
export const DELETE_SHIFT_BREAK_CONTENT = 'Are you sure you want to delete this shift break?';
export const DELETE_SHIFT_TITLE = 'Delete Shift';
export const DELETE_SHIFT_CONTENT = 'Are you sure you want to delete this shift? All associated shift related data will be deleted.';
export const DELETE_SHIFT_ROTATION_TITLE = 'Delete Shift Rotation';
export const DELETE_SHIFT_ROTATION_CONTENT = 'Are you sure you want to delete this shift rotation?';

// Rules
export const DELETE_RULE_TITLE = 'Delete Rule';
export const DELETE_RULE_CONTENT = 'Are you sure you want to delete this rule? All associated rule related data will be deleted.';
export const DELETE_RULE_SPEC_TITLE = 'Delete Rule Specification';
export const DELETE_RULE_SPEC_CONTENT = 'Are you sure you want to delete this rule specification?';

// Absences
export const DELETE_ABSENCE_TITLE = 'Delete Absence';
export const DELETE_ABSENCE_CONTENT = 'Are you sure you want to delete this absence?';

// Holidays
export const DELETE_HOLIDAY_TITLE = 'Delete Holiday';
export const DELETE_HOLIDAY_CONTENT = 'Are you sure you want to delete this holiday?';

// Schedules
export const DELETE_WORKER_SCHEDULE_TITLE = 'Delete Schedule Entries';
export const DELETE_DAILY_WORKER_SCHEDULE_CONTENT = 'Are you sure you want to delete all daily entries for this worker?';
export const DELETE_ALL_WORKER_SCHEDULE_CONTENT = 'Are you sure you want to delete all entries for this worker?';
export const DELETE_SCHEDULE_ENTRIES_CONTENT = 'Are you sure you want to delete all schedule entries? This action cannot be undone.';

export const CREATE_SCHEDULE_TITLE = 'Create Schedule Warning';
export const CREATE_SCHEDULE_WARNING_TEMPLATE = 'You are about to create a new schedule from {0} to {1}. This action will: <br/><br/>'+
'- {2}; <br/>'+ // Single responsibility / Multiple responsibilities
'- {3} existing schedule entries; <br/>'+
'- {4}; <br/>'+ // All members are included / Filtered members are included
'- {5}; <br/>'+ // All shifts are included / Filtered shifts are included
'- {6}. <br/><br/>'+ // All rules are included / Filtered rules are included
'Do you wish to proceed?';
export const CREATE_SCHEDULE_CLEAR_EXISTING = 'Clear all';
export const CREATE_SCHEDULE_MERGE_EXISTING = 'Keep all';
export const CREATE_SCHEDULE_SINGLE_RESPONSIBILITY = 'Workers can only have one responsibility';
export const CREATE_SCHEDULE_MULTIPLE_RESPONSIBILITIES = 'Workers can have multiple responsibilities';
export const CREATE_SCHEDULE_ALL_MEMBERS = 'All members are included';
export const CREATE_SCHEDULE_FILTERED_MEMBERS = 'Selected {0} members';
export const CREATE_SCHEDULE_ALL_SHIFTS = 'All shifts are included';
export const CREATE_SCHEDULE_FILTERED_SHIFTS = 'Selected {0} shifts';
export const CREATE_SCHEDULE_ALL_RULES = 'All rules are included';
export const CREATE_SCHEDULE_FILTERED_RULES = 'Selected {0} rules';