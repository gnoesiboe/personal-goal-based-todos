import { generateId } from '../../../utility/idUtilities';
import { Notification, NotificationType } from './../../../model/notification';
import { useState } from 'react';

export type NotifyHandler = (
    title: string,
    description?: string,
    type?: NotificationType,
    timeoutLength?: number,
) => void;
export type RemoveNotificationHandler = (id: string) => void;

export default function useManageNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify: NotifyHandler = (
        title,
        description,
        type = NotificationType.Success,
        timeoutLength = 4,
    ) => {
        setNotifications((currentNotifications) => [
            ...currentNotifications,
            {
                id: generateId(),
                title,
                description,
                type,
                timeoutLength,
            },
        ]);
    };

    const removeNotification: RemoveNotificationHandler = (id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter(
                (cursorNotification) => cursorNotification.id !== id,
            ),
        );
    };

    return { notifications, notify, removeNotification };
}
