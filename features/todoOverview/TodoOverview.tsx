import React from 'react';
import Island from '../../primitives/island/Island';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import DayList from './components/DayList';
import Day from './components/Day';
import {
    checkIsSameDay,
    createDateKey,
    createDateRange,
    createStartOfToday,
} from '../../utility/dateTimeUtilities';
import DayNavigation from '../../primitives/dayNavigation/DayNavigation';
import DirectionIndicator from './components/DirectionIndicator';
import classNames from './todoOverview.module.scss';
import TodoList from './components/TodoList';
import AddTodo from '../addTodo/AddTodo';
import {
    useCurrentDate,
    useTodoListItems,
} from '../../context/todos/TodoListItemsContext';
import DayActions from './components/DayActions';
import DayHeading from './components/DayHeading';

const TodoOverview: React.FC = () => {
    const {
        currentDate,
        firstVisibleDate,
        dayNavigationDirection,
        moveToPreviousDate,
        moveCurrentDateToToday,
        moveToDate,
        moveToNextDate,
        numberOfDaysDisplayed,
    } = useCurrentDate();

    const { items } = useTodoListItems();

    const dateRange = createDateRange(firstVisibleDate, numberOfDaysDisplayed);

    const today = createStartOfToday();

    return (
        <MainLayout.Body fullWidth>
            <MainLayout.ContentMain>
                <Island fullWidth ghost deflatedTop>
                    <DayNavigation
                        onNextClick={() => moveToNextDate()}
                        onTodayClick={() => moveCurrentDateToToday()}
                        onPreviousClick={() => moveToPreviousDate()}
                        firstVisibleDate={firstVisibleDate}
                    />
                    <DirectionIndicator
                        direction={dayNavigationDirection}
                        firstVisibleDate={firstVisibleDate}
                    />
                    <div className={classNames.dayListContainer}>
                        <DayList>
                            {dateRange.map((date) => {
                                const key = createDateKey(date);
                                const itemsForDate = items
                                    ? items[key] || []
                                    : [];
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
                                        current={isCurrent}
                                        navigationDirection={
                                            dayNavigationDirection
                                        }
                                    >
                                        <div className={classNames.dayHeader}>
                                            <DayHeading
                                                date={date}
                                                onClick={() => moveToDate(date)}
                                            />
                                        </div>
                                        <div className={classNames.dayContent}>
                                            <TodoList
                                                items={itemsForDate}
                                                currentDate={isCurrent}
                                            />
                                        </div>
                                        <DayActions isCurrentDate={isCurrent}>
                                            <AddTodo date={date} />
                                        </DayActions>
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
