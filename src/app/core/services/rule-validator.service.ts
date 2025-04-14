import { Injectable } from '@angular/core';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { EntityRuleSpecificationDTO } from '../../shared/models/DTOs/Incoming/EntityRuleSpecificationDTO';
import { EntityRuleDTO } from '../../shared/models/DTOs/Incoming/EntityRuleDTO';

@Injectable({
  providedIn: 'root'
})
export class RuleValidatorService {

  constructor() { }

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

  validateMaxHoursPerWeek(entityRules : EntityRuleDTO[], entityRuleInstance : EntityRuleDTO, isEditOp: boolean) : BaseResponseModel {
    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    // If there are no items, no need to check for any rules
    if (entityRules.length === 0) {
      response.success = true;
      return response;
    }

    // If it is an edit operation, there is only 1 record and the rule type is different
    else if(isEditOp && entityRules.length == 1 && entityRules[0].ruleTypeId != 2)
    {
      response.success = true;
      return response;
    }

    // Check for existing Max Hour per Shift rule
    let maxWeeklyHourRuleExists = entityRules.some(rule => rule.ruleTypeId === 2);
    let otherMaxWeeklyHourRuleExists = entityRules.some(rule => rule.ruleTypeId === 2 && rule.entityRuleId !== entityRuleInstance.entityRuleId);

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
}
