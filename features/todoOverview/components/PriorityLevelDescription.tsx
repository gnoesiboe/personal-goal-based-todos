import React from 'react';
import { PriorityLevel } from '../../../model/todoListItem';
import Heading from '../../../primitives/heading/Heading';
import classNames from '../todoOverview.module.scss';

type Props = {
    level: PriorityLevel;
};

const PriorityLevelDescription: React.FC<Props> = ({ level }) => {
    let label: string;

    switch (level) {
        case PriorityLevel.UrgentAndImportant:
            label = 'Urgent, belangrijk';
            break;

        case PriorityLevel.NotUrgentAndImportant:
            label = 'Niet urgent, wél belangrijk';
            break;

        case PriorityLevel.UrgentAndNotImportant:
            label = 'Urgent, niet belangrijk';
            break;

        case PriorityLevel.NotUrgentAndNotImportant:
            label = 'Niet urgent, niet belangrijk';
            break;

        default:
            throw new Error(`Priority level '${level}' not supported`);
    }

    return (
        <Heading
            tag="h4"
            flattened
            deflated
            className={classNames.priorityLevelDescription}
        >
            {label}
        </Heading>
    );
};

export default PriorityLevelDescription;
