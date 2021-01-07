import React, { ReactElement } from 'react';
import Island from '../../../primitives/island/Island';
import classNames from '../rolesOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    children: ReactElement[];
};

const RoleList: React.FC<Props> = ({ children }) => (
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
                    <Island>{child}</Island>
                </motion.li>
            ))}
        </AnimatePresence>
    </ul>
);

export default RoleList;
