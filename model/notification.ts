export enum NotificationType {
    Error = 'error',
    Warning = 'warning',
    Success = 'success',
}

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    description?: string;
    timeoutLength: number;
}
