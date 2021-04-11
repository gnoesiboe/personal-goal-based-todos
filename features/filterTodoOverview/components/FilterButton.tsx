import React, { MouseEventHandler } from 'react';
import CheckboxButton from '../../../primitives/checkboxButton/CheckboxButton';
import classNames from '../filterTodoOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    active: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
    count: number;
};

const FilterButton: React.FC<Props> = ({
    active,
    onClick,
    children,
    count,
}) => (
    <AnimatePresence>
        {count > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <CheckboxButton
                    active={active}
                    onClick={onClick}
                    deflated
                    style="link"
                    size="small"
                    className={classNames.button}
                >
                    {children} ({count})
                </CheckboxButton>
            </motion.div>
        )}
    </AnimatePresence>
);

export default FilterButton;
