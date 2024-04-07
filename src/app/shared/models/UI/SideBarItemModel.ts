export class SideBarItemModel {
    sidebarItemText: string;
    sidebarItemIcon: string;
    sidebarItemLink: string;
    sidebarItemChildren: SideBarItemModel[] = [];

    constructor(text: string, icon: string, link: string, children: SideBarItemModel[]) {
        this.sidebarItemText = text;
        this.sidebarItemIcon = icon;
        this.sidebarItemLink = link;
        this.sidebarItemChildren = children;
    }
}