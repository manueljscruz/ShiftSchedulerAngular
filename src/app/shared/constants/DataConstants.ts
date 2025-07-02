import { SkillDTO } from "../models/DTOs/Incoming/SkillDTO";

// Business Aspect Constants
export const BUSINESS_ASPECT_WORKER_ID: number = 1;
export const BUSINESS_ASPECT_SKILLS_ID: number = 2;
export const BUSINESS_ASPECT_SHIFTS_ID: number = 3;

// Regex Constants
export const EMAIL_REGEX: RegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
export const ALPHA_NUMERIC_SPECIAL_REGEX: RegExp = new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).*$/);

// Rule Type Constants
export const MAX_HOURS_DAY_ID: number = 1;
export const MAX_HOURS_WEEK_ID: number = 2;
export const MIN_WORKERS_SHIFT_ID: number = 3;
export const MAX_WORKERS_SHIFT_ID: number = 4;
export const REQ_SKILLSET_SHIFT_ID: number = 5;
export const REQ_QTY_SKILL_SHIFT_ID: number = 6;
export const MAX_CONSECUTIVE_SHIFTS_ID: number = 7;
export const SHIFT_INCLUDES_WEEKENDS_ID: number = 8;
export const POST_SHIFT_REST_HOURS_ID: number = 9;
export const REQ_QTY_SKILL_SHIFT_WEEKDAYS_ID: number = 10;
export const REQ_QTY_SKILL_SHIFT_WEEKENDS_ID: number = 11;
export const MAX_CONSECUTIVE_DAYS_NON_ROTATIONERS_ID: number = 12;
export const MIN_DAYS_OFF_WEEK_ID: number = 13;
export const MIN_WEEKENDS_OFF_MONTH_ID: number = 14;
export const AVG_HOURS_WEEK_ID: number = 15;
export const AVG_HOURS_MONTH_ID: number = 16;


// SKILL CONSTANTS
export const ADD_SKILL : SkillDTO = new SkillDTO(0, "", "#FFFFFF", "#000000");