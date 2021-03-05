import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from '../groupedSelect.module.scss';

type Props = {
    children: ReactNode;
    visible: boolean;
};

const ContentContainer: React.FC<Props> = ({ children, visible }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                className={classNames.contentContainer}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export default ContentContainer;
