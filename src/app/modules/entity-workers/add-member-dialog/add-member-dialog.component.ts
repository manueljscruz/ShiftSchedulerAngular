import { Component, Inject } from '@angular/core';
import { ADD_ICON, ADD_MEMBER_ICON, ADD_NPC_MEMBER_ICON, EMAIL_ICON } from '../../../shared/constants/IconNamesConstants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrl: './add-member-dialog.component.css'
})
export class AddMemberDialogComponent {

  /// Constants
  ADD_MEMBER_ICON: string = ADD_MEMBER_ICON;
  ADD_NPC_MEMBER_ICON: string = ADD_NPC_MEMBER_ICON;

  ADD_ICON: string = ADD_ICON;
  EMAIL_ICON: string = EMAIL_ICON;

  /// <summary>
  /// The index of the selected tab.
  /// 0 - Send email invite
  /// 1 - Create Bot member
  /// </summary>
  selectedTabIndex: number = 0;

  /// <summary>
  /// Whether the user has specified skills for the member.
  /// </summary>
  specifySkills: boolean = false;

  /// <summary>
  /// The list of all skills available to the user.
  /// </summary>
  localizedSkills: SkillDTO[] = [];

  /// <summary>
  /// The list of skills that the user has selected.
  /// </summary>
  selectedSkills: SkillDTO[] = [];

  /// <summary>
  /// The text to display on the execute action button.
  /// </summary>
  executeActionText: string = 'Send';

  /// <summary>
  /// The icon to display on the execute action button.
  /// </summary>
  executeActionIcon: string = EMAIL_ICON;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(data);
    this.localizedSkills = data.skillList;
   }

  tabChanged($event: MatTabChangeEvent) {
    $event.index === 0 ? this.executeActionText = 'Send' : this.executeActionText = 'Create';
    $event.index === 0 ? this.executeActionIcon = EMAIL_ICON : this.executeActionIcon = ADD_ICON;
  }

  toggleSpecifySkills($event: MatCheckboxChange) {
    this.specifySkills = $event.checked;
  }

  executeAction() {
    console.log(this.selectedSkills);
  }
}
