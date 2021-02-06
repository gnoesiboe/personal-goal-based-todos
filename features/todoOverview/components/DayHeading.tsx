import React from 'react';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import Heading from '../../../primitives/heading/Heading';

type Props = {
    date: Date;
};

const DayHeading: React.FC<Props> = ({ date }) => (
    <Heading tag="h2" style="secondary" centered flattened>
        {getRelativeDayDescription(date)}
    </Heading>
);

export default DayHeading;
