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
    RemoveTodoHandler,
    UpdateTodoHandler,
} from './hooks/useModifyTodoCollection';
import useKeyboardEventListeners from './hooks/useKeyboardEventListeners';
import useMoveNotDoneItemsInThePastToToday from './hooks/useMoveNotDoneItemsInThePastToToday';
import {
    DayNavigationDirection,
    ItemsState,
    useTodoReducer,
} from './reducers/todoReducer';
import { resolveCurrentTodo } from './resolver/todoResolver';
import useFetchTodoListItems from './hooks/useFetchTodoListItems';

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
    backlogItems: ItemsState;
    isFetching: boolean;
    currentTodoIndex: number | null;
    setCurrentTodo: SetCurrentTodoHandler;
    addTodo: AddTodoHandler;
    updateTodo: UpdateTodoHandler;
    removeTodo: RemoveTodoHandler;
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler;
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
    backlogItems: null,
    isFetching: false,
    currentTodoIndex: null,
    setCurrentTodo: () => {},
    addTodo: async () => false,
    updateTodo: async () => false,
    removeTodo: async () => false,
    moveTodoOneDayForward: async () => false,
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
        backlogItems,
        isFetching,
    } = state;

    const {
        moveToPreviousDate,
        moveCurrentDateToToday,
        moveToNextDate,
        moveToDate,
    } = useManageCurrentDate(dispatch);

    const { fetchTodos, refetchTodos } = useFetchTodoListItems(
        firstVisibleDate,
        numberOfDaysDisplayed,
        dispatch,
    );

    const {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        removeTodo,
    } = useModifyTodoCollection(
        currentDate,
        numberOfDaysDisplayed,
        fetchTodos,
        items,
        backlogItems,
        dispatch,
    );

    const { setCurrentTodo, resetCurrentTodoIndex } = useManageCurrentTodo(
        dispatch,
    );

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
        backlogItems,
        isFetching,
        currentTodoIndex,
        setCurrentTodo,
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
        setCurrentTodo,
        items,
        backlogItems,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
    } = useContext(Context);

    return {
        currentTodoIndex,
        setCurrentTodo,
        items,
        backlogItems,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
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
