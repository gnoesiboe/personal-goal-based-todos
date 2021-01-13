import React from 'react';
import Island from '../../primitives/island/Island';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import DayList from './components/DayList';
import Day from './components/Day';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import {
    checkIsSameDay,
    createDateKey,
    createDateRange,
    createStartOfToday,
} from '../../utility/dateTimeUtilities';
import useManageCurrentDate from './hooks/useManageCurrentDate';
import DayNavigation from '../../primitives/dayNavigation/DayNavigation';
import DirectionIndicator from './components/DirectionIndicator';
import classNames from './todoOverview.module.scss';
import TodoList from './components/TodoList';
import TodoListItem from '../todoListItem/TodoListItem';
import useManageTodoListItems from './hooks/useManageTodoListItems';

const TodoOverview: React.FC = () => {
    const {
        currentDate,
        direction,
        onNextClick,
        onTodayClick,
        onPreviousClick,
    } = useManageCurrentDate();

    const noOfDays = useDetermineNumberOfDaysThatCanBeDisplayed();

    const { itemsPerDate } = useManageTodoListItems(currentDate, noOfDays);

    const dateRange = createDateRange(currentDate, noOfDays);

    const today = createStartOfToday();

    return (
        <MainLayout.Body fullWidth>
            <MainLayout.ContentMain>
                <Island breakout ghost>
                    <DayNavigation
                        onNextClick={onNextClick}
                        onTodayClick={onTodayClick}
                        onPreviousClick={onPreviousClick}
                        currentDate={currentDate}
                    />
                    <DirectionIndicator
                        direction={direction}
                        currentDate={currentDate}
                    />
                    <div className={classNames.dayListContainer}>
                        <DayList>
                            {dateRange.map((date) => {
                                const key = createDateKey(date);
                                const items = itemsPerDate[key] || [];

                                return (
                                    <Day
                                        key={date.getTime()}
                                        date={date}
                                        current={checkIsSameDay(date, today)}
                                        navigationDirection={direction}
                                    >
                                        <TodoList>
                                            {items.map((item) => (
                                                <TodoListItem
                                                    key={item.id}
                                                    item={item}
                                                />
                                            ))}
                                        </TodoList>
                                    </Day>
                                );
                            })}
                        </DayList>
                    </div>
                </Island>
            </MainLayout.ContentMain>
        </MainLayout.Body>
    );
};

export default TodoOverview;
