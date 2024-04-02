import { Component, Input } from '@angular/core';
import { BOOTSTRAP_ICON_PREFIX } from '../../constants/IconNamesConstants';

@Component({
  selector: 'sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})

export class SidebarItemComponent {

  BOOTSTRAP_ICON_PREFIX: string = BOOTSTRAP_ICON_PREFIX;

  @Input() public sidebarItemText: string = '';
  @Input() public sidebarItemRouterLink: string = '';
  @Input() public sidebarItemIcon: string = "default-icon"; 
  
  constructor(){
  }
}
