import React from 'react';
import classNames from '../todoOverview.module.scss';
import createClassName from 'classnames';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import { DayNavigationDirection } from '../hooks/useManageCurrentDate';
import { motion } from 'framer-motion';
import { transitionVariants } from './DayList';

type Props = {
    date: Date;
    current: boolean;
    navigationDirection: DayNavigationDirection;
};

const Day: React.FC<Props> = ({ date, current, navigationDirection }) => {
    const className = createClassName(classNames.day, {
        [classNames.dayIsCurrent]: current,
    });

    return (
        <motion.div
            variants={transitionVariants}
            custom={navigationDirection}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
            }}
            className={className}
        >
            <h3>{getRelativeDayDescription(date)}</h3>
        </motion.div>
    );
};

export default Day;
