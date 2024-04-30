import { Component, Input } from '@angular/core';
import { BOOTSTRAP_ICON_PREFIX } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';

@Component({
  selector: 'sidebar-item-group',
  templateUrl: './sidebar-item-group.component.html',
  styleUrl: './sidebar-item-group.component.css'
})
export class SidebarItemGroupComponent {

  BOOTSTRAP_ICON_PREFIX: string = BOOTSTRAP_ICON_PREFIX;

  @Input() public sidebarItemGroupId: string = '';
  @Input() public sidebarItemGroupText: string = '';
  @Input() public sidebarGroupItems: SideBarItemModel[] = [];
  @Input() public sidebarItemGroupIcon: string = '';

  constructor() 
  { 

  }

  ngOnInit()
  {
    // console.log(this.sidebarGroupItems);
  }

  ngOnChanges()
  {
    
  }
}
