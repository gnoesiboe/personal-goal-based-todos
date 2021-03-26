import React, { ReactNode } from 'react';
import classNames from '../form.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    children: ReactNode;
    visible?: boolean;
};

const Help: React.FC<Props> = ({ children, visible = true }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                className={classNames.help}
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

export default Help;
