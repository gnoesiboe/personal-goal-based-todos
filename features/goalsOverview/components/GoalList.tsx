import React, { ReactElement } from 'react';
import classNames from './../goalsOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    children: ReactElement[];
};

const GoalList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.list}>
        <AnimatePresence>
            {React.Children.map(children, (child) => (
                <motion.li
                    key={child.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.2 },
                    }}
                >
                    {child}
                </motion.li>
            ))}
        </AnimatePresence>
    </ul>
);

export default GoalList;
