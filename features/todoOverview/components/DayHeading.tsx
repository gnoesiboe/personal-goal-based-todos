import React, { MouseEventHandler } from 'react';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import Heading from '../../../primitives/heading/Heading';
import Button from '../../../primitives/button/Button';

type Props = {
    date: Date;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const DayHeading: React.FC<Props> = ({ date, onClick }) => (
    <Button deflated unstyled block onClick={onClick}>
        <Heading tag="h2" style="secondary" centered flattened>
            {getRelativeDayDescription(date)}
        </Heading>
    </Button>
);

export default DayHeading;
