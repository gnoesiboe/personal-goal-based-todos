import React, { useState } from 'react';
import useShowHide from '../../../hooks/useShowHide';
import { Goal as GoalModel } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import Button from '../../../primitives/button/Button';
import classNames from '../goalOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    goal: GoalModel;
};

const Goal: React.FC<Props> = ({ goal }) => {
    const {
        visible: descriptionVisible,
        toggle: toggleDescription,
    } = useShowHide();

    return (
        <>
            <Button onClick={() => toggleDescription()} transparent>
                <div className={classNames.goalHeader}>
                    <Heading tag="h3" flattened>
                        {goal.title}
                        {goal.description && (
                            <>
                                {descriptionVisible ? (
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
                {descriptionVisible && goal.description && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.2 },
                        }}
                        className={classNames.goalDescription}
                    >
                        <p>{goal.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Goal;
