import React, { useState } from 'react';
import useShowHide from '../../../hooks/useShowHide';
import { Goal as GoalModel } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import Button from '../../../primitives/button/Button';

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
            </Button>
            {descriptionVisible && goal.description && (
                <p>{goal.description}</p>
            )}
        </>
    );
};

export default Goal;
