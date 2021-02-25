import React, { MouseEventHandler } from 'react';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import Heading from '../../../primitives/heading/Heading';
import Button from '../../../primitives/button/Button';
import classNames from '../todoOverview.module.scss';

type Props = {
    date: Date;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const DayHeading: React.FC<Props> = ({ date, onClick }) => (
    <div className={classNames.dayHeading}>
        <Button deflated unstyled block onClick={onClick}>
            <Heading tag="h2" style="secondary" centered flattened>
                {getRelativeDayDescription(date)}
            </Heading>
        </Button>
    </div>
);

export default DayHeading;
