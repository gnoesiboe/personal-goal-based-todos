import React from 'react';
import { useNotifications } from '../../context/notification/NotificationContext';
import NotificationDetails from '../notificationDetails/NotificationDetails';
import NotificationList from './components/NotificationList';
import classNames from './notificationOverview.module.scss';

const NotificationOverview: React.FC = () => {
    const { notifications } = useNotifications();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className={classNames.container}>
            <NotificationList>
                {notifications.map((notification) => (
                    <NotificationDetails
                        notification={notification}
                        key={notification.id}
                    />
                ))}
            </NotificationList>
        </div>
    );
};

export default NotificationOverview;
