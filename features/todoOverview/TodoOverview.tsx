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
    getRelativeDayDescription,
} from '../../utility/dateTimeUtilities';
import DayNavigation from '../../primitives/dayNavigation/DayNavigation';
import DirectionIndicator from './components/DirectionIndicator';
import classNames from './todoOverview.module.scss';
import TodoList from './components/TodoList';
import AddTodo from '../addTodo/AddTodo';
import Heading from '../../primitives/heading/Heading';
import {
    useCurrentDate,
    useTodoListItems,
} from '../../context/todos/TodoListItemsContext';
import DayActions from './components/DayActions';

const TodoOverview: React.FC = () => {
    const {
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
        noOfDaysDisplayed,
    } = useCurrentDate();

    const { itemsPerDate } = useTodoListItems();

    const dateRange = createDateRange(currentDate, noOfDaysDisplayed);

    const today = createStartOfToday();

    return (
        <MainLayout.Body fullWidth>
            <MainLayout.ContentMain>
                <Island fullWidth ghost deflatedTop>
                    <DayNavigation
                        onNextClick={onNextDateClick}
                        onTodayClick={onTodayClick}
                        onPreviousClick={onPreviousDateClick}
                        currentDate={currentDate}
                    />
                    <DirectionIndicator
                        direction={dayNavigationDirection}
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
                                        navigationDirection={
                                            dayNavigationDirection
                                        }
                                    >
                                        <div className={classNames.dayHeader}>
                                            <Heading
                                                tag="h2"
                                                style="secondary"
                                                centered
                                                flattened
                                            >
                                                {getRelativeDayDescription(
                                                    date,
                                                )}
                                            </Heading>
                                        </div>
                                        <div className={classNames.dayContent}>
                                            <TodoList
                                                items={items}
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
