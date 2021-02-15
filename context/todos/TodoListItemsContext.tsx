import React, { useContext } from 'react';
import { TodoListItem } from '../../model/todoListItem';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import useManageCurrentDate, {
    DayNavigationDirection,
} from './hooks/useManageCurrentDate';
import useManageCurrentTodo, {
    SetCurrentTodoIndexHandler,
} from './hooks/useManageCurrentTodo';
import useManageTodoListItems from './hooks/useManageTodoListItems';
import {
    AddTodoHandler,
    MoveTodoOneDayForwardHandler,
    RemoveTodoHandler,
    UpdateTodoHandler,
} from './hooks/useModifyTodoCollection';
import useKeyboardEventListeners from './hooks/useKeyboardEventListeners';
import { createDateKey } from '../../utility/dateTimeUtilities';
import useMoveNotDoneItemsInThePastToToday from './hooks/useMoveNotDoneItemsInThePastToToday';

type ContextValue = {
    noOfDaysDisplayed: number;
    currentDate: Date;
    dayNavigationDirection: DayNavigationDirection;
    onNextDateClick: () => void;
    onTodayClick: () => void;
    onPreviousDateClick: () => void;
    itemsPerDate: Record<string, TodoListItem[]>;
    isFetching: boolean;
    currentTodoIndex: number | null;
    setCurrentTodoIndex: SetCurrentTodoIndexHandler;
    addTodo: AddTodoHandler;
    updateTodo: UpdateTodoHandler;
    removeTodo: RemoveTodoHandler;
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler;
};

const initialValue: ContextValue = {
    noOfDaysDisplayed: 0,
    currentDate: new Date(),
    dayNavigationDirection: 'forwards',
    onNextDateClick: () => {},
    onTodayClick: () => {},
    onPreviousDateClick: () => {},
    itemsPerDate: {},
    isFetching: false,
    currentTodoIndex: null,
    setCurrentTodoIndex: () => {},
    addTodo: async () => false,
    updateTodo: async () => false,
    removeTodo: async () => false,
    moveTodoOneDayForward: async () => false,
};

const Context = React.createContext<ContextValue>(initialValue);

export const TodoListItemContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const noOfDaysDisplayed = useDetermineNumberOfDaysThatCanBeDisplayed();

    const {
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
    } = useManageCurrentDate();

    const {
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        removeTodo,
        refetchTodos,
    } = useManageTodoListItems(currentDate, noOfDaysDisplayed);

    const {
        currentTodoIndex,
        setCurrentTodoIndex,
        resetCurrentTodoIndex,
    } = useManageCurrentTodo(itemsPerDate, currentDate);

    const itemsForCurrentDate = itemsPerDate[createDateKey(currentDate)] || [];

    const currentTodo = currentTodoIndex
        ? itemsForCurrentDate[currentTodoIndex] || null
        : null;

    useKeyboardEventListeners(
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        currentTodo,
        removeTodo,
        resetCurrentTodoIndex,
    );

    useMoveNotDoneItemsInThePastToToday(refetchTodos);

    const value: ContextValue = {
        noOfDaysDisplayed,
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
        itemsPerDate,
        isFetching,
        currentTodoIndex,
        setCurrentTodoIndex,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTodoListItems = () => {
    const {
        currentTodoIndex,
        setCurrentTodoIndex,
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
    } = useContext(Context);

    return {
        currentTodoIndex,
        setCurrentTodoIndex,
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
    };
};

export const useCurrentDate = () => {
    const {
        noOfDaysDisplayed,
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
    } = useContext(Context);

    return {
        noOfDaysDisplayed,
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
    };
};
