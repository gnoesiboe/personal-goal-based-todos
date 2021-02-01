import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from '../todoListItem.module.scss';

type Props = {
    children: ReactNode;
    current: boolean;
};

const CurrentContentContainer: React.FC<Props> = ({ children, current }) => (
    <AnimatePresence>
        {current && (
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className={classNames.currentContentContainer}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export default CurrentContentContainer;
