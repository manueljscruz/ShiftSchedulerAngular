import { Injectable } from '@angular/core';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { EntityRuleSpecificationDTO } from '../../shared/models/DTOs/Incoming/EntityRuleSpecificationDTO';
import { EntityRuleDTO } from '../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { MAX_HOURS_WEEK_ID, MIN_DAYS_OFF_WEEK_ID, MIN_WEEKENDS_OFF_MONTH_ID } from '../../shared/constants/DataConstants';

@Injectable({
  providedIn: 'root'
})
export class RuleValidatorService {

  constructor() { }

  //#region Validate Max Hours Per Day

  /// <summary>
  /// Validates the max hour per shift rule
  /// Rule Type Id 1 is the max hour per shift and can only have 1 rule of this type
  /// </summary>
  validateMaxHourPerDay(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != 1)
    {
      response.success = true;
      return response;
    }

    // Check for existing Max Hour per Day rule
    let maxHourRuleExists = entityRules.some(rule => rule.ruleTypeId === 1);
    let otherMaxHourRuleExists = entityRules.some(rule => rule.ruleTypeId === 1 && rule.entityRuleId !== entityRuleInstance.entityRuleId);

    // If it's an edit operation and another Max Hour per Day rule exists
    if (isEditOp && otherMaxHourRuleExists) {
        response.message = 'Max Hour per Day rule already exists';
        return response;
    }

    // If it's an add operation and a Max Hour per Day rule already exists
    if (!isEditOp && maxHourRuleExists) {
        response.message = 'Max Hour per Day rule already exists';
        return response;
    }
    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Max Hours Per Week

  validateMaxHoursPerWeek(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != MAX_HOURS_WEEK_ID)
    {
      response.success = true;
      return response;
    }

    // Check for existing Max Hour per Shift rule
    let maxWeeklyHourRuleExists = entityRules.some(rule => rule.ruleTypeId === MAX_HOURS_WEEK_ID);
    let otherMaxWeeklyHourRuleExists = entityRules.some(rule => rule.ruleTypeId === MAX_HOURS_WEEK_ID && rule.entityRuleId !== entityRuleInstance.entityRuleId);

    // If it's an edit operation and another Max Hour per Shift rule exists
    if (isEditOp && otherMaxWeeklyHourRuleExists) {
        response.message = 'Max Hour per Week rule already exists';
        return response;
    }

    // If it's an add operation and a Max Hour per Shift rule already exists
    if (!isEditOp && maxWeeklyHourRuleExists) {
        response.message = 'Max Hour per Week rule already exists';
        return response;
    }
    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Skill Per Shift

  /// <summary>
  /// Validates the skill per shift rule
  /// Aspect Reference Id 1 is the skill
  /// Aspect Reference Id 2 is the shift
  /// </summary>
  validateSkillPerShift(currentRuleSpecs : EntityRuleSpecificationDTO[], ruleSpecInstance : EntityRuleSpecificationDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (currentRuleSpecs.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation
    if (isEditOp) {
      if (currentRuleSpecs.length === 1) {
        response.success = true;
        return response;
      }
    }

    // Check if the new spec has a skill that is already in the currentRuleSpecs array
    if (currentRuleSpecs.some(x => x.aspectReferenceId === ruleSpecInstance.aspectReferenceId)) {
      response.success = false;
      response.message = 'Skill already exists in the current rule specifications';
      return response;
    }

    // Check if the new spec shift is different from the currentRuleSpecs array
    if (currentRuleSpecs.some(x => x.aspectReferenceId2 !== ruleSpecInstance.aspectReferenceId2)) {
      response.success = false;
      response.message = 'Shift selection is different from existing current rule specifications';
      return response;
    }

    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Skill Quantity Per Shift

  /// <summary>
  /// Validates the skill quantity per shift rule (including weekdays and weekend)
  /// Aspect Reference Id 1 is the skill
  /// Aspect Reference Id 2 is the shift
  /// </summary>
  validateSkillQuantityPerShift(currentRuleSpecs : EntityRuleSpecificationDTO[], ruleSpecInstance : EntityRuleSpecificationDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (currentRuleSpecs.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation
    if (isEditOp) {
      if (currentRuleSpecs.length === 1) {
        response.success = true;
        return response;
      }
    }

    // Check if the new spec has a skill that is already in the currentRuleSpecs array
    if (currentRuleSpecs.some(x => x.aspectReferenceId === ruleSpecInstance.aspectReferenceId && x.aspectReferenceId2 === ruleSpecInstance.aspectReferenceId2)) {
      response.success = false;
      response.message = 'Skill already exists in the current rule specifications';
      return response;
    }

    // Check if the new spec shift is different from the currentRuleSpecs array
    /*
    if (currentRuleSpecs.some(x => x.aspectReferenceId2 !== ruleSpecInstance.aspectReferenceId2)) {
      response.success = false;
      response.message = 'Shift selection is different from existing current rule specifications';
      return response;
    }
      */

    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Spec Min Days Off Per Week

  validateSpecMinDaysOffPerWeek(ruleSpecs : EntityRuleSpecificationDTO[], ruleSpecInstance : EntityRuleSpecificationDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    if(!isEditOp && ruleSpecs.length > 0) {
      response.message = 'Min Days Off per Week rule can only have 1 specification';
      return response;
    }

    // let entityRuleSpec = ruleSpecs[0];
    if(ruleSpecInstance.ruleSpecificationValue < 0) {
      response.message = 'Min Days Off per Week rule cannot be less than 0';
      return response;
    }

    if(ruleSpecInstance.ruleSpecificationValue > 7) {
      response.message = 'Min Days Off per Week rule cannot be greater than 7';
      return response;
    }

    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Spec Min Weekends Off Per Month
  validateSpecMinWeekendsOffPerMonth(ruleSpecs : EntityRuleSpecificationDTO[], ruleSpecInstance : EntityRuleSpecificationDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    if(!isEditOp && ruleSpecs.length > 0) {
      response.message = 'Min Weekends Off per Month rule can only have 1 specification';
      return response;
    }

    // let entityRuleSpec = ruleSpecs[0];
    if(ruleSpecInstance.ruleSpecificationValue < 0) {
      response.message = 'Min Weekends Off per Month rule cannot be less than 0';
      return response;
    }

    if(ruleSpecInstance.ruleSpecificationValue > 5) {
      response.message = 'Min Weekends Off per Month rule cannot be greater than 5';
      return response;
    }

    response.success = true;
    return response;
  }

  //#region Validate Rule Min Days Off Per Week

  validateRuleMinDaysOffPerWeek(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != MIN_DAYS_OFF_WEEK_ID)
    {
      response.success = true;
      return response;
    }

    // Check for existing Min Days Off per Week rule
    let minDaysOffRuleExists = entityRules.some(rule => rule.ruleTypeId === MIN_DAYS_OFF_WEEK_ID);
    let otherMinDaysOffRuleExists = entityRules.some(rule => rule.ruleTypeId === MIN_DAYS_OFF_WEEK_ID && rule.entityRuleId !== entityRuleInstance.entityRuleId);

    // If it's an edit operation and another Min Days Off per Week rule exists
    if (isEditOp && otherMinDaysOffRuleExists) {
        response.message = 'Min Days Off per Week rule already exists';
        return response;
    }

    // If it's an add operation and a Min Days Off per Week rule already exists
    if (!isEditOp && minDaysOffRuleExists) {
        response.message = 'Min Days Off per Week rule already exists';
        return response;
    }

    response.success = true;
    return response;
  }

  //#endregion

  validateRuleWeekendsOffPerMonth(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != MIN_WEEKENDS_OFF_MONTH_ID)
    {
      response.success = true;
      return response;
    }

    // Check for existing Min Days Off per Month rule
    let minWeekendsOffRuleExists = entityRules.some(rule => rule.ruleTypeId === MIN_WEEKENDS_OFF_MONTH_ID);
    let otherMinWeekendsOffRuleExists = entityRules.some(rule => rule.ruleTypeId === MIN_WEEKENDS_OFF_MONTH_ID && rule.entityRuleId !== entityRuleInstance.entityRuleId);

    // If it's an edit operation and another Min Days Off per Month rule exists
    if (isEditOp && otherMinWeekendsOffRuleExists) {
        response.message = 'Min Weekends Off per Month rule already exists';
        return response;
    }

    // If it's an add operation and a Min Days Off per Month rule already exists
    if (!isEditOp && minWeekendsOffRuleExists) {
        response.message = 'Min Weekends Off per Month rule already exists';
        return response;
    }

    response.success = true;
    return response;
  }
}
