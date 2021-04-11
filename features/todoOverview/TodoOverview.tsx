import React from 'react';
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
import FilterTodoOverview from '../filterTodoOverview/FilterTodoOverview';
import { StickyContainer } from 'react-sticky';

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

    const { filteredItems } = useTodoListItems();

    const dateRange = createDateRange(firstVisibleDate, numberOfDaysDisplayed);

    const today = createStartOfToday();

    return (
        <StickyContainer>
            <DayNavigation
                onNextClick={() => moveToNextDate()}
                onTodayClick={() => moveCurrentDateToToday()}
                onPreviousClick={() => moveToPreviousDate()}
                currentDate={currentDate}
            />
            <FilterTodoOverview />
            <DirectionIndicator
                direction={dayNavigationDirection}
                firstVisibleDate={firstVisibleDate}
            />
            <div className={classNames.dayListContainer}>
                <DayList>
                    {dateRange.map((date) => {
                        const key = createDateKey(date);
                        const itemsForDate = filteredItems
                            ? filteredItems[key] || []
                            : [];
                        const isToday = checkIsSameDay(date, today);
                        const isCurrent = checkIsSameDay(date, currentDate);

                        return (
                            <Day
                                key={date.getTime()}
                                date={date}
                                today={isToday}
                                current={isCurrent}
                                navigationDirection={dayNavigationDirection}
                            >
                                <DayHeading
                                    date={date}
                                    onClick={() => moveToDate(date)}
                                />
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
        </StickyContainer>
    );
};

export default TodoOverview;
