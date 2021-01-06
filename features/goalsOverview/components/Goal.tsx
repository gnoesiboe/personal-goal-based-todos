import React from 'react';
import { Goal as GoalModel } from '../../../model/goal';

type Props = {
    goal: GoalModel;
};

const Goal: React.FC<Props> = ({ goal }) => (
    <>
        <h3>{goal.title}</h3>
        {goal.description && <p>{goal.description}</p>}
    </>
);

export default Goal;
