export class SideBarItemModel {
    sidebarItemId: string;
    sidebarItemText: string;
    sidebarItemIcon: string;
    sidebarItemLink: string;
    sidebarItemChildren: SideBarItemModel[] = [];

    constructor(id: string, text: string, icon: string, link: string, children: SideBarItemModel[]) {
        this.sidebarItemId = id;
        this.sidebarItemText = text;
        this.sidebarItemIcon = icon;
        this.sidebarItemLink = link;
        this.sidebarItemChildren = children;
    }

    updateName(newName: string) {
        this.sidebarItemText = newName;
    }
}