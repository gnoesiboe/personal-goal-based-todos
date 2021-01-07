import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import classNames from '../goalsOverview.module.scss';

type Props = {
    detailsVisible: boolean;
};

const GoalDescriptionOpenedIndicator: React.FC<Props> = ({
    detailsVisible,
}) => (
    <div className={classNames.goalDescriptionOpenedIndicator}>
        {detailsVisible ? <ChevronUpIcon /> : <ChevronDownIcon size="small" />}
    </div>
);

export default GoalDescriptionOpenedIndicator;
