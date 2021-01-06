import React, { ReactNode, useState } from 'react';
import useShowHide from '../../../hooks/useShowHide';
import { Goal as GoalModel } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import Button from '../../../primitives/button/Button';
import classNames from '../goalOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    goal: GoalModel;
    children: ReactNode;
};

const Goal: React.FC<Props> = ({ goal, children }) => {
    const {
        visible: detailsVisible,
        toggle: toggleDetailsVisible,
    } = useShowHide();

    return (
        <>
            <Button onClick={() => toggleDetailsVisible()} transparent>
                <div className={classNames.goalHeader}>
                    <Heading tag="h3" flattened>
                        {goal.title}
                        {goal.description && (
                            <>
                                {detailsVisible ? (
                                    <ChevronUpIcon />
                                ) : (
                                    <ChevronDownIcon />
                                )}
                            </>
                        )}
                    </Heading>
                </div>
            </Button>
            <AnimatePresence>
                {detailsVisible && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                            marginBottom: '40px',
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.2 },
                        }}
                        className={classNames.goalDescription}
                    >
                        {goal.description && <p>{goal.description}</p>}
                        <div className={classNames.goalActions}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Goal;
