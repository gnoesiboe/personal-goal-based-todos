import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react';
import classNames from '../todoOverview.module.scss';
import useHideAfterTimeout from '../../../hooks/useHideAfterTimeout';
import { motion } from 'framer-motion';
import { DayNavigationDirection } from '../../../context/todos/reducers/todoReducer';

type Props = {
    direction: DayNavigationDirection;
    firstVisibleDate: Date;
};

const variants = {
    initial: (direction: DayNavigationDirection) => ({
        opacity: 0,
        x: direction === 'forwards' ? '-30vw' : '30vw',
        scale: 1,
    }),
    animate: (direction: DayNavigationDirection) => ({
        opacity: 0.3,
        x: direction === 'forwards' ? '30vw' : '-30vw',
        scale: 2,
    }),
};

const defaultDuration = 0.4;

const DirectionIndicator: React.FC<Props> = ({
    direction,
    firstVisibleDate,
}) => {
    const visible = useHideAfterTimeout(1000, [direction, firstVisibleDate]);

    if (!visible) {
        return null;
    }

    return (
        <div className={classNames.directionIndicator}>
            {visible && (
                <motion.div
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        x: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            duration: defaultDuration,
                        },
                        opacity: { duration: defaultDuration },
                    }}
                >
                    {direction === 'forwards' ? (
                        <ArrowRightIcon size="medium" />
                    ) : (
                        <ArrowLeftIcon size="medium" />
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default DirectionIndicator;
