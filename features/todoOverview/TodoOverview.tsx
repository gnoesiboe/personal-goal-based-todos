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
import useManageCurrentTodo from './hooks/useManageCurrentTodo';

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

    const { currentTodoIndex } = useManageCurrentTodo(
        itemsPerDate,
        currentDate,
    );

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
                                const isToday = checkIsSameDay(date, today);
                                const isCurrent = checkIsSameDay(
                                    date,
                                    currentDate,
                                );

                                return (
                                    <Day
                                        key={date.getTime()}
                                        date={date}
                                        today={isToday}
                                        navigationDirection={direction}
                                    >
                                        <TodoList>
                                            {items.map((item, index) => (
                                                <TodoListItem
                                                    key={item.id}
                                                    item={item}
                                                    current={
                                                        isCurrent &&
                                                        index ===
                                                            currentTodoIndex
                                                    }
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
