import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityWorkerMemberDTO } from '../../models/DTOs/Incoming/EntityWorkerMemberDTO';
import { MatDialog } from '@angular/material/dialog';
import { DELETE_MEMBER_CONTENT, DELETE_MEMBER_TITLE, KICK_OUT_MEMBER_CONTENT, KICK_OUT_MEMBER_TITLE } from '../../constants/UITextConstants';
import { GenericWarningDialogComponent } from '../generic-warning-dialog/generic-warning-dialog.component';

@Component({
  selector: 'entity-worker-member-card',
  templateUrl: './entity-worker-member-card.component.html',
  styleUrl: './entity-worker-member-card.component.css'
})
export class EntityWorkerMemberCardComponent {

  DELETE_MEMBER_TITLE = DELETE_MEMBER_TITLE;
  DELETE_MEMBER_CONTENT = DELETE_MEMBER_CONTENT;
  KICK_OUT_MEMBER_TITLE = KICK_OUT_MEMBER_TITLE;
  KICK_OUT_MEMBER_CONTENT = KICK_OUT_MEMBER_CONTENT;

  @Input() entityWorkerMember: EntityWorkerMemberDTO = new EntityWorkerMemberDTO('', '', false, [], false, false, false, false, []);
  @Input() allowActions: boolean = false;
  @Input() selectionMode: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() editWorkerTemplateEvent = new EventEmitter<EntityWorkerMemberDTO>();
  @Output() deleteWorkerTemplateEvent = new EventEmitter<EntityWorkerMemberDTO>();
  @Output() selectionChange = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  editWorker(workerToEdit: EntityWorkerMemberDTO) {
    this.editWorkerTemplateEvent.emit(workerToEdit);
  }

  removeWorker(workerToRemove: EntityWorkerMemberDTO) {
    const isBot = workerToRemove.isBot;

    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: {
        warningTitle: isBot ? DELETE_MEMBER_TITLE : KICK_OUT_MEMBER_TITLE,
        warningMessage: isBot ? DELETE_MEMBER_CONTENT : KICK_OUT_MEMBER_CONTENT,
        isDeleteWarning: isBot,
        isKickOut: !isBot
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWorkerTemplateEvent.emit(workerToRemove);
      }
    });
  }
}
