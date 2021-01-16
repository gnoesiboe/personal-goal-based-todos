import React, { MouseEventHandler } from 'react';
import {
    checkIsSameDay,
    createStartOfToday,
} from '../../utility/dateTimeUtilities';
import Island from '../island/Island';
import Item from './components/Item';
import ItemList from './components/ItemList';
import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react';

type Props = {
    onPreviousClick: MouseEventHandler<HTMLButtonElement>;
    onNextClick: MouseEventHandler<HTMLButtonElement>;
    onTodayClick: MouseEventHandler<HTMLButtonElement>;
    currentDate: Date;
};

const DayNavigation: React.FC<Props> = ({
    onPreviousClick,
    onTodayClick,
    onNextClick,
    currentDate,
}) => (
    <Island ghost>
        <nav>
            <ItemList>
                <Item onClick={onPreviousClick}>
                    <ArrowLeftIcon /> terug
                </Item>
                <Item
                    onClick={onTodayClick}
                    disabled={checkIsSameDay(currentDate, createStartOfToday())}
                >
                    vandaag
                </Item>
                <Item onClick={onNextClick}>
                    verder <ArrowRightIcon />
                </Item>
            </ItemList>
        </nav>
    </Island>
);

export default DayNavigation;
