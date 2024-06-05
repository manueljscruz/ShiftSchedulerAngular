import { Component } from '@angular/core';

@Component({
  selector: 'entity-rules',
  templateUrl: './entity-rules.component.html',
  styleUrl: './entity-rules.component.css'
})
export class EntityRulesComponent {

  isCurrentUserEntityOwner :boolean = false;

  isFormActive : boolean = false;

  constructor() {

  }

  ngOnInit() {
    this.isCurrentUserEntityOwner = true;
  }

  toggleForm(newValue : boolean) {
    this.isFormActive = newValue;
  }
}
