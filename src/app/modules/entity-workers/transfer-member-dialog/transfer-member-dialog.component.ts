import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { EntityPermissionRoleDTO } from '../../../shared/models/DTOs/Incoming/EntityPermissionRoleDTO';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { TransferMembersDTO } from '../../../shared/models/DTOs/Outgoing/TransferMembersDTO';
import { MemberTransferItemDTO } from '../../../shared/models/DTOs/Outgoing/MemberTransferItemDTO';
import { EntityService } from '../../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';

interface MemberConfig {
  member: EntityWorkerMemberDTO;
  entityPermissionRoleId: number;
  canManageChildren: boolean;
  partOfRoster: boolean;
  partOfRotation: boolean;
  worksWeekDays: boolean;
  worksWeekends: boolean;
  multipleShiftAssignments: boolean;
  selectedSkills: SkillDTO[];
}

@Component({
  selector: 'app-transfer-member-dialog',
  templateUrl: './transfer-member-dialog.component.html',
  styleUrl: './transfer-member-dialog.component.css'
})
export class TransferMemberDialogComponent implements OnInit {

  @Output() onMembersTransferred = new EventEmitter<BaseResponseModel>();

  // Tab 1
  isTransfer: boolean = false;   // false = copy, true = transfer/move
  destinationEntityId: string = '';
  umbrellaEntities: any[] = [];

  // Tab 2
  memberConfigs: MemberConfig[] = [];
  roleOptions: EntityPermissionRoleDTO[] = [];
  availableSkills: SkillDTO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: EntityService,
    private loadingScreenService: LoadingSpinnerManagerService
  ) {}

  ngOnInit(): void {
    this.roleOptions = this.data.entityPermissionRoles ?? [];
    this.availableSkills = this.data.entitySkills ?? [];

    // Pre-populate config per member from their current values
    this.memberConfigs = (this.data.selectedMembers as EntityWorkerMemberDTO[]).map(m => ({
      member: m,
      entityPermissionRoleId: m.entityPermissionRoleId || 3,
      canManageChildren: m.canManageChildren,
      partOfRoster: m.partOfRoster,
      partOfRotation: m.partOfRotation,
      worksWeekDays: m.worksWeekDays,
      worksWeekends: m.worksWeekends,
      multipleShiftAssignments: m.multipleShiftAssignments,
      selectedSkills: m.skillSet ? [...m.skillSet] : []
    }));

    this.loadUmbrellaEntities();
  }

  private async loadUmbrellaEntities(): Promise<void> {
    this.umbrellaEntities = await this.entityService.getUmbrellaEntities(this.data.sourceEntityId);
  }

  compareSkills(s1: SkillDTO, s2: SkillDTO): boolean {
    return s1 && s2 ? s1.skillId === s2.skillId : s1 === s2;
  }

  isManagerRole(config: MemberConfig): boolean {
    return config.entityPermissionRoleId === 2;
  }

  getRoleLabel(roleId: number): string {
    const role = this.roleOptions.find(r => r.entityPermissionRoleId === roleId);
    return role ? role.entityPermissionRoleDisplayValue : '';
  }

  onRotationChange(config: MemberConfig, checked: boolean): void {
    config.partOfRotation = checked;
    if (checked) {
      config.worksWeekDays = false;
      config.worksWeekends = false;
    }
  }

  async confirm(): Promise<void> {
    if (!this.destinationEntityId) return;

    const dto = new TransferMembersDTO();
    dto.sourceEntityId = this.data.sourceEntityId;
    dto.destinationEntityId = this.destinationEntityId;
    dto.isTransfer = this.isTransfer;
    dto.members = this.memberConfigs.map(cfg => {
      const item = new MemberTransferItemDTO();
      item.workerId = cfg.member.workerId;
      item.workerName = cfg.member.workerName;
      item.isBot = cfg.member.isBot;
      item.entityPermissionRoleId = cfg.entityPermissionRoleId;
      item.canManageChildren = cfg.canManageChildren;
      item.partOfRoster = cfg.partOfRoster;
      item.partOfRotation = cfg.partOfRotation;
      item.worksWeekDays = cfg.worksWeekDays;
      item.worksWeekends = cfg.worksWeekends;
      item.multipleShiftAssignments = cfg.multipleShiftAssignments;
      item.assignedSkills = cfg.selectedSkills;
      return item;
    });

    this.loadingScreenService.changeLoadingState(true);
    const response = await this.entityService.transferCopyMembers(dto);
    this.loadingScreenService.changeLoadingState(false);

    if (!response.message) {
      response.message = this.isTransfer
        ? 'Members transferred successfully.'
        : 'Members copied successfully.';
    }

    this.onMembersTransferred.emit(response);
  }
}
