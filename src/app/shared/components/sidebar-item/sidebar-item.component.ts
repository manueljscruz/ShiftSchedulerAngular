import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})

export class SidebarItemComponent {

  @Input() public sidebarItemText: string = '';
  @Input() public sidebarItemRouterLink: string = '';
  @Input() public sidebarItemIcon: string = "default-icon"; 
  constructor(){
  }
}
