import { useEffect } from 'react';
import { useNotifications } from '../../../context/notification/NotificationContext';
import { Notification } from '../../../model/notification';

export default function useCloseAfterTimeout(notification: Notification) {
    const { removeNotification } = useNotifications();

    useEffect(() => {
        const timeoutLengthInMiliSeconds = notification.timeoutLength * 1000;

        const handle = setTimeout(
            () => removeNotification(notification.id),
            timeoutLengthInMiliSeconds,
        );

        return () => clearTimeout(handle);
    }, []);
}
