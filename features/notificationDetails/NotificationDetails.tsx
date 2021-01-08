import React from 'react';
import nl2br from 'react-nl2br';
import { useNotifications } from '../../context/notification/NotificationContext';
import { NotificationType, Notification } from '../../model/notification';
import Heading from '../../primitives/heading/Heading';
import classNames from './notificationDetails.module.scss';
import CloseButton from './components/CloseButton';
import createClassName from 'classnames';
import useCloseAfterTimeout from './hookse/useCloseAfterTimeout';

type Props = {
    notification: Notification;
};

const NotificationDetails: React.FC<Props> = ({ notification }) => {
    const { removeNotification } = useNotifications();

    useCloseAfterTimeout(notification);

    const containerClassName = createClassName(classNames.container, {
        [classNames.isTypeError]: notification.type === NotificationType.Error,
        [classNames.isTypeSuccess]:
            notification.type === NotificationType.Success,
        [classNames.isTypeWarning]:
            notification.type === NotificationType.Warning,
    });

    return (
        <div className={containerClassName}>
            <div className={classNames.header}>
                <CloseButton
                    onClick={() => removeNotification(notification.id)}
                />
                <Heading tag="h4" flattened>
                    {notification.title}
                </Heading>
            </div>
            {notification.description && (
                <p className={classNames.description}>
                    {nl2br(notification.description)}
                </p>
            )}
        </div>
    );
};

export default NotificationDetails;
