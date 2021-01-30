import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from '../todoOverview.module.scss';

type Props = {
    children: ReactNode;
    isCurrentDate: boolean;
};

const animationYOffset = 100;

const animationVariants = {
    enter: {
        opacity: 0,
        y: animationYOffset,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: animationYOffset,
    },
};

const DayActions: React.FC<Props> = ({ children, isCurrentDate }) => {
    if (!isCurrentDate) {
        return null;
    }

    return (
        <motion.div
            className={classNames.dayActions}
            variants={animationVariants}
            initial="enter"
            animate="animate"
            exit="exit"
            transition={{
                y: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export default DayActions;
