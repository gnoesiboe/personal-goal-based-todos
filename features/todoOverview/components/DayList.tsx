import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { DayNavigationDirection } from '../../../context/todos/hooks/useManageCurrentDate';
import classNames from '../todoOverview.module.scss';

export const defaultDuration = 1;

export const transitionVariants = {
    enter: (navigationDirection: DayNavigationDirection) => ({
        x: navigationDirection === 'forwards' ? 340 : -340,
        opacity: 0.5,
    }),
    animate: {
        x: 0,
        opacity: 1,
    },
};

type Props = {
    children: ReactElement[];
};

const DayList: React.FC<Props> = ({ children }) => (
    <motion.div
        transition={{
            staggerChildren: 0.07,
            delayChildren: 0,
        }}
        className={classNames.dayList}
    >
        {children}
    </motion.div>
);

export default DayList;
