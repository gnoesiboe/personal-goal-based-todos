import React, { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from '../notificationOverview.module.scss';

type Props = {
    children: ReactElement[];
};

const NotificationList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.list}>
        <AnimatePresence>
            {React.Children.map(children, (child) => (
                <motion.li
                    key={child.key}
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.2 },
                    }}
                >
                    {child}
                </motion.li>
            ))}
        </AnimatePresence>
    </ul>
);

export default NotificationList;
