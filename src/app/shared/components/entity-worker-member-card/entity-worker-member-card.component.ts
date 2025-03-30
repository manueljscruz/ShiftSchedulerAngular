import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityWorkerMemberDTO } from '../../models/DTOs/Incoming/EntityWorkerMemberDTO';
import { GenericDeleteWarningDialogComponent } from '../generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DELETE_MEMBER_CONTENT, DELETE_MEMBER_TITLE } from '../../constants/UITextConstants';

@Component({
  selector: 'entity-worker-member-card',
  templateUrl: './entity-worker-member-card.component.html',
  styleUrl: './entity-worker-member-card.component.css'
})
export class EntityWorkerMemberCardComponent {

  DELETE_MEMBER_TITLE = DELETE_MEMBER_TITLE;
  DELETE_MEMBER_CONTENT = DELETE_MEMBER_CONTENT;

  @Input() entityWorkerMember: EntityWorkerMemberDTO = new EntityWorkerMemberDTO('', '', false, false, false, [], false, []);
  @Input() allowActions: boolean = false;
  @Output() editWorkerTemplateEvent = new EventEmitter<EntityWorkerMemberDTO>();
  @Output() deleteWorkerTemplateEvent = new EventEmitter<EntityWorkerMemberDTO>();

  constructor(private dialog: MatDialog) {
    
  }

  editWorker(workerToEdit: EntityWorkerMemberDTO) {
    this.editWorkerTemplateEvent.emit(workerToEdit);
  } 

  removeWorker(enterAnimationDuration: string, exitAnimationDuration: string, workerToRemove: EntityWorkerMemberDTO, title: string, message: string) {
    const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: message}
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        this.deleteWorkerTemplateEvent.emit(workerToRemove);
      }
    });
  }

  
}
