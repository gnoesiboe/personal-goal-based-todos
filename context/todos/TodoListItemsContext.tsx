import React, { useContext } from 'react';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import useManageCurrentDate, {
    MoveToDateHandler,
} from './hooks/useManageCurrentDate';
import useManageCurrentTodo, {
    SetCurrentTodoHandler,
} from './hooks/useManageCurrentTodo';
import useModifyTodoCollection, {
    AddTodoHandler,
    MoveTodoOneDayForwardHandler,
    MoveToNextWeekHandler,
    RemoveTodoHandler,
    UpdateTodoHandler,
} from './hooks/useModifyTodoCollection';
import useKeyboardEventListeners from './hooks/useKeyboardEventListeners';
import useMoveNotDoneItemsInThePastToToday from './hooks/useMoveNotDoneItemsInThePastToToday';
import {
    AppliedFilters,
    DayNavigationDirection,
    FilterItemCounts,
    ItemsState,
    useTodoReducer,
} from './reducers/todoReducer';
import { resolveCurrentTodo } from './resolver/todoResolver';
import useFetchTodoListItems from './hooks/useFetchTodoListItems';
import useManageFilters from './hooks/useManageFilters';

type ContextValue = {
    numberOfDaysDisplayed: number;
    currentDate: Date;
    firstVisibleDate: Date;
    moveToPreviousDate: () => void;
    moveToDate: MoveToDateHandler;
    moveCurrentDateToToday: () => void;
    moveToNextDate: () => void;
    dayNavigationDirection: DayNavigationDirection;
    items: ItemsState;
    filteredItems: ItemsState;
    backlogItems: ItemsState;
    isFetching: boolean;
    currentTodoIndex: number | null;
    setCurrentTodo: SetCurrentTodoHandler;
    addTodo: AddTodoHandler;
    updateTodo: UpdateTodoHandler;
    removeTodo: RemoveTodoHandler;
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler;
    moveToNextWeek: MoveToNextWeekHandler;
    appliedFilters: AppliedFilters;
    filterCounts: FilterItemCounts;
    toggleHideDone: () => void;
    toggleHideWaiting: () => void;
    toggleHideEvening: () => void;
};

const initialValue: ContextValue = {
    numberOfDaysDisplayed: 0,
    currentDate: new Date(),
    firstVisibleDate: new Date(),
    moveToPreviousDate: () => {},
    moveCurrentDateToToday: () => {},
    moveToDate: () => {},
    moveToNextDate: () => {},
    dayNavigationDirection: 'forwards',
    items: {},
    filteredItems: {},
    backlogItems: null,
    isFetching: false,
    currentTodoIndex: null,
    setCurrentTodo: () => {},
    addTodo: async () => false,
    updateTodo: async () => false,
    removeTodo: async () => false,
    moveTodoOneDayForward: async () => false,
    moveToNextWeek: async () => false,
    appliedFilters: {
        hideDone: false,
        hideWaiting: false,
        hideEvening: false,
    },
    filterCounts: {
        done: 0,
        evening: 0,
        waiting: 0,
    },
    toggleHideDone: () => {},
    toggleHideWaiting: () => {},
    toggleHideEvening: () => {},
};

const Context = React.createContext<ContextValue>(initialValue);

export const TodoListItemContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [state, dispatch] = useTodoReducer();

    useDetermineNumberOfDaysThatCanBeDisplayed(dispatch);

    const {
        dateCursor: {
            currentDate,
            firstVisibleDate,
            direction: dayNavigationDirection,
        },
        numberOfDaysDisplayed,
        currentTodoIndex,
        items,
        filteredItems,
        backlogItems,
        isFetching,
        appliedFilters,
        filterCounts,
    } = state;

    const {
        moveToPreviousDate,
        moveCurrentDateToToday,
        moveToNextDate,
        moveToDate,
    } = useManageCurrentDate(dispatch);

    const { refetchTodos } = useFetchTodoListItems(
        firstVisibleDate,
        numberOfDaysDisplayed,
        dispatch,
    );

    const {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveToNextWeek,
        moveTodoOneDayBackwards,
        removeTodo,
    } = useModifyTodoCollection(items, backlogItems, dispatch, refetchTodos);

    const { setCurrentTodo, resetCurrentTodoIndex } = useManageCurrentTodo(
        dispatch,
    );

    const {
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    } = useManageFilters(dispatch);

    const currentTodo = resolveCurrentTodo(
        items,
        currentDate,
        currentTodoIndex,
    );

    useKeyboardEventListeners(
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        currentTodo,
        removeTodo,
        resetCurrentTodoIndex,
    );

    useMoveNotDoneItemsInThePastToToday(refetchTodos);

    const value: ContextValue = {
        numberOfDaysDisplayed,
        currentDate,
        firstVisibleDate,
        moveToPreviousDate,
        moveToDate,
        moveCurrentDateToToday,
        moveToNextDate,
        dayNavigationDirection,
        items,
        filteredItems,
        backlogItems,
        isFetching,
        currentTodoIndex,
        setCurrentTodo,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
        moveToNextWeek,
        appliedFilters,
        filterCounts,
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTodoListItems = () => {
    const {
        currentTodoIndex,
        setCurrentTodo,
        items,
        filteredItems,
        backlogItems,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
        moveToNextWeek,
        appliedFilters,
        filterCounts,
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    } = useContext(Context);

    return {
        currentTodoIndex,
        setCurrentTodo,
        items,
        filteredItems,
        backlogItems,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
        moveToNextWeek,
        appliedFilters,
        filterCounts,
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    };
};

export const useCurrentDate = () => {
    const {
        numberOfDaysDisplayed,
        currentDate,
        firstVisibleDate,
        dayNavigationDirection,
        moveToPreviousDate,
        moveCurrentDateToToday,
        moveToDate,
        moveToNextDate,
    } = useContext(Context);

    return {
        numberOfDaysDisplayed,
        currentDate,
        firstVisibleDate,
        dayNavigationDirection,
        moveToPreviousDate,
        moveCurrentDateToToday,
        moveToDate,
        moveToNextDate,
    };
};
