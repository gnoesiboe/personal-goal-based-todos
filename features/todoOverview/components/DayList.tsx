import { AnimatePresence } from 'framer-motion';
import React, { ReactElement } from 'react';
import { DayNavigationDirection } from '../hooks/useManageCurrentDate';
import classNames from '../todoOverview.module.scss';

export const transitionVariants = {
    enter: (navigationDirection: DayNavigationDirection) => ({
        x: navigationDirection === 'forwards' ? 320 : -320,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (navigationDirection: DayNavigationDirection) => ({
        zIndex: 0,
        x: navigationDirection === 'backwards' ? 320 : -320,
        opacity: 0,
        transition: { duration: 0.4 },
    }),
};

type Props = {
    children: ReactElement[];
};

const DayList: React.FC<Props> = ({ children }) => (
    <div className={classNames.dayList}>
        <AnimatePresence>{children}</AnimatePresence>
    </div>
);

export default DayList;
