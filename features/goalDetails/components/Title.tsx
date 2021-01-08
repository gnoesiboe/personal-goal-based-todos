import React from 'react';
import { Goal } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import classNames from '../goalDetails.module.scss';

type Props = {
    goal: Goal;
    children: React.ReactNode;
};

const Title: React.FC<Props> = ({ goal, children }) => {
    const title = goal.title.replace(/`([^`]+)`/g, '<em>$1</em>');

    return (
        <Heading tag="h3" flattened>
            <span
                className={classNames.title}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            {children}
        </Heading>
    );
};

export default Title;
