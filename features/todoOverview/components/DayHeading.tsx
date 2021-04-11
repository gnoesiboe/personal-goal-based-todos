import React, { MouseEventHandler } from 'react';
import { getRelativeDayDescription } from '../../../utility/dateTimeUtilities';
import Heading from '../../../primitives/heading/Heading';
import Button from '../../../primitives/button/Button';
import classNames from '../todoOverview.module.scss';
import { Sticky } from 'react-sticky';
import createClassName from 'classnames';

type Props = {
    date: Date;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const DayHeading: React.FC<Props> = ({ date, onClick }) => (
    <Sticky topOffset={79}>
        {({ style, isSticky }) => (
            <div
                className={createClassName(
                    classNames.dayHeading,
                    isSticky && classNames.dayHeadingIsSticky,
                )}
                style={style}
            >
                <Button deflated unstyled block onClick={onClick}>
                    <Heading tag="h2" style="secondary" centered flattened>
                        {getRelativeDayDescription(date)}
                    </Heading>
                </Button>
            </div>
        )}
    </Sticky>
);

export default DayHeading;
