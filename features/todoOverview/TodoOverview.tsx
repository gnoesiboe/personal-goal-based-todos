import React, { useState } from 'react';
import Heading from '../../primitives/heading/Heading';
import Island from '../../primitives/island/Island';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import DayList from './components/DayList';
import Day from './components/Day';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import {
    checkIsSameDay,
    createDateRange,
} from '../../utility/dateTimeUtilities';
import useManageCurrentDate from './hooks/useManageCurrentDate';
import DayNavigation from './components/DayNavigation';

const TodoOverview: React.FC = () => {
    const {
        currentDate,
        onNextClick,
        onTodayClick,
        onPreviousClick,
    } = useManageCurrentDate();

    const noOfDays = useDetermineNumberOfDaysThatCanBeDisplayed();

    const dateRange = createDateRange(currentDate, noOfDays);

    return (
        <MainLayout.Body fullWidth>
            <MainLayout.ContentHeader>
                <Heading tag="h1" flattened>
                    Todo list
                </Heading>
            </MainLayout.ContentHeader>
            <MainLayout.ContentMain>
                <Island breakout ghost>
                    <DayNavigation
                        onNextClick={onNextClick}
                        onTodayClick={onTodayClick}
                        onPreviousClick={onPreviousClick}
                        currentDate={currentDate}
                    />
                    <DayList>
                        {dateRange.map((date) => (
                            <Day
                                key={date.getTime()}
                                date={date}
                                current={checkIsSameDay(currentDate, date)}
                            />
                        ))}
                    </DayList>
                </Island>
            </MainLayout.ContentMain>
        </MainLayout.Body>
    );
};

export default TodoOverview;
