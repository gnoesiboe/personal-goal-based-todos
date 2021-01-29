import React, { useContext } from 'react';
import { TodoListItem } from '../../model/todoListItem';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import useManageCurrentDate, {
    DayNavigationDirection,
} from './hooks/useManageCurrentDate';
import useManageCurrentTodo from './hooks/useManageCurrentTodo';
import useManageTodoListItems from './hooks/useManageTodoListItems';
import {
    AddTodoHandler,
    UpdateTodoHandler,
} from './hooks/useModifyTodoCollection';

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
    addTodo: AddTodoHandler;
    updateTodo: UpdateTodoHandler;
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
    addTodo: async () => false,
    updateTodo: async () => false,
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
    } = useManageTodoListItems(currentDate, noOfDaysDisplayed);

    const { currentTodoIndex } = useManageCurrentTodo(
        itemsPerDate,
        currentDate,
    );

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
        addTodo,
        updateTodo,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTodoListItems = () => {
    const {
        currentTodoIndex,
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
    } = useContext(Context);

    return {
        currentTodoIndex,
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
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
