export class SideBarItemModel {
    sidebarItemText: string;
    sidebarItemIcon: string;
    sidebarItemLink: string;

    constructor(text: string, icon: string, link: string) {
        this.sidebarItemText = text;
        this.sidebarItemIcon = icon;
        this.sidebarItemLink = link;
    }
}