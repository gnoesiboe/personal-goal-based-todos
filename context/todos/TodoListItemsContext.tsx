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
    UpdateTodoHandler,
} from './hooks/useModifyTodoCollection';
import useKeyboardEventListeners from './hooks/useKeyboardEventListeners';

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
        postponeTodoToTomorrow,
    } = useManageTodoListItems(currentDate, noOfDaysDisplayed);

    const { currentTodoIndex, setCurrentTodoIndex } = useManageCurrentTodo(
        itemsPerDate,
        currentDate,
    );

    useKeyboardEventListeners(
        postponeTodoToTomorrow,
        itemsPerDate,
        currentDate,
        currentTodoIndex,
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
        setCurrentTodoIndex,
        addTodo,
        updateTodo,
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
    } = useContext(Context);

    return {
        currentTodoIndex,
        setCurrentTodoIndex,
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
