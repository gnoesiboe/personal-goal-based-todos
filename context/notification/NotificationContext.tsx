import { createContext, ReactNode, useContext } from 'react';
import { Notification } from '../../model/notification';
import useManageNotifications, {
    NotifyHandler,
    RemoveNotificationHandler,
} from './hooks/useManageNotifications';

type ContextValue = {
    notifications: Notification[];
    notify: NotifyHandler;
    removeNotification: RemoveNotificationHandler;
};

const initialValue: ContextValue = {
    notifications: [],
    notify: () => {},
    removeNotification: () => {},
};

const NotificationContext = createContext<ContextValue>(initialValue);

export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        notifications,
        notify,
        removeNotification,
    } = useManageNotifications();

    const value: ContextValue = {
        notifications,
        notify,
        removeNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
