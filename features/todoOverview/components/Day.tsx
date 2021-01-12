import React from 'react';
import classNames from '../todoOverview.module.scss';
import createClassName from 'classnames';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';

type Props = {
    date: Date;
    current: boolean;
};

const Day: React.FC<Props> = ({ date, current }) => {
    const className = createClassName(classNames.day, {
        [classNames.dayIsCurrent]: current,
    });

    return (
        <div className={className}>
            <h3>{getRelativeDayDescription(date)}</h3>
        </div>
    );
};

export default Day;
