import React, { ReactNode } from 'react';
import classNames from '../todoOverview.module.scss';
import createClassName from 'classnames';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import { DayNavigationDirection } from '../hooks/useManageCurrentDate';
import { motion } from 'framer-motion';
import { defaultDuration, transitionVariants } from './DayList';
import Heading from '../../../primitives/heading/Heading';

type Props = {
    date: Date;
    current: boolean;
    navigationDirection: DayNavigationDirection;
    children: ReactNode;
};

const Day: React.FC<Props> = ({
    date,
    current,
    navigationDirection,
    children,
}) => {
    const className = createClassName(classNames.day, {
        [classNames.dayIsCurrent]: current,
    });

    return (
        <motion.div
            variants={transitionVariants}
            custom={navigationDirection}
            initial="enter"
            animate="animate"
            transition={{
                x: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    duration: defaultDuration,
                },
                opacity: { duration: defaultDuration },
            }}
            className={className}
        >
            <Heading tag="h2" style="secondary" centered>
                {getRelativeDayDescription(date)}
            </Heading>
            {children}
        </motion.div>
    );
};

export default Day;
