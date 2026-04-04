export class UserNotificationDTO {
    id: string = '';
    notificationTypeCode: string = '';
    message: string = '';
    relatedEntityId: string | null = null;
    isRead: boolean = false;
    createdAt: Date = new Date();
}
