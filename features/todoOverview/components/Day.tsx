import React, { ReactNode } from 'react';
import classNames from '../todoOverview.module.scss';
import createClassName from 'classnames';
import { motion } from 'framer-motion';
import { defaultDuration, transitionVariants } from './DayList';
import { DayNavigationDirection } from '../../../context/todos/reducers/todoReducer';

type Props = {
    date: Date;
    today: boolean;
    current: boolean;
    navigationDirection: DayNavigationDirection;
    children: ReactNode;
};

const Day: React.FC<Props> = ({
    today,
    current,
    navigationDirection,
    children,
}) => {
    const className = createClassName(classNames.day, {
        [classNames.dayIsToday]: today,
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
            {children}
        </motion.div>
    );
};

export default Day;
