import { Injectable } from '@angular/core';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { EntityRuleSpecificationDTO } from '../../shared/models/DTOs/Incoming/EntityRuleSpecificationDTO';
import { EntityRuleDTO } from '../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { AVG_HOURS_MONTH_ID, AVG_HOURS_WEEK_ID, MAX_HOURS_DAY_ID, MAX_HOURS_WEEK_ID, MIN_DAYS_OFF_WEEK_ID, MIN_WEEKENDS_OFF_MONTH_ID } from '../../shared/constants/DataConstants';

@Injectable({
  providedIn: 'root'
})
export class RuleValidatorService {
  

  constructor() { }

  //#region Validate Single Instance Rules

  validateSingleInstanceRules(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean, ruleTypeId : number, existingErrorMsg : string) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != ruleTypeId)
    {
      response.success = true;
      return response;
    }

    // Check for existing rule
    let ruleExists = entityRules.some(rule => rule.ruleTypeId === ruleTypeId);
    let otherRuleExists = entityRules.some(rule => rule.ruleTypeId === ruleTypeId && rule.entityRuleId !== entityRuleInstance.entityRuleId);

    // If it's an edit operation and another rule exists
    if (isEditOp && otherRuleExists) {
        response.message = existingErrorMsg;
        return response;
    }

    // If it's an add operation and this rule type already exists
    if (!isEditOp && ruleExists) {
        response.message = existingErrorMsg;
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

  //#endregion

}
