import React, { useContext } from 'react';
import useDetermineNumberOfDaysThatCanBeDisplayed from './hooks/useDetermineNumberOfDaysThatCanBeDisplayed';
import useManageCurrentDate from './hooks/useManageCurrentDate';
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
import useMoveNotDoneItemsInThePastToToday from './hooks/useMoveNotDoneItemsInThePastToToday';
import {
    DayNavigationDirection,
    ItemsState,
    useTodoReducer,
} from './reducers/todoReducer';
import { resolveCurrentTodo } from './resolver/todoResolver';

type ContextValue = {
    numberOfDaysDisplayed: number;
    currentDate: Date;
    moveToPreviousDate: () => void;
    moveToToday: () => void;
    moveToNextDate: () => void;
    dayNavigationDirection: DayNavigationDirection;
    items: ItemsState;
    isFetching: boolean;
    currentTodoIndex: number | null;
    setCurrentTodoIndex: SetCurrentTodoIndexHandler;
    addTodo: AddTodoHandler;
    updateTodo: UpdateTodoHandler;
    removeTodo: RemoveTodoHandler;
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler;
};

const initialValue: ContextValue = {
    numberOfDaysDisplayed: 0,
    currentDate: new Date(),
    moveToPreviousDate: () => {},
    moveToToday: () => {},
    moveToNextDate: () => {},
    dayNavigationDirection: 'forwards',
    items: {},
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
    const [state, dispatch] = useTodoReducer();

    useDetermineNumberOfDaysThatCanBeDisplayed(dispatch);

    const {
        dateCursor,
        numberOfDaysDisplayed,
        currentTodoIndex,
        items,
        isFetching,
    } = state;

    const {
        moveToPreviousDate,
        moveToToday,
        moveToNextDate,
    } = useManageCurrentDate(dispatch);

    const {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        removeTodo,
        refetchTodos,
    } = useManageTodoListItems(
        dateCursor.date,
        numberOfDaysDisplayed,
        items,
        dispatch,
    );

    const { setCurrentTodoIndex, resetCurrentTodoIndex } = useManageCurrentTodo(
        dispatch,
    );

    const currentTodo = resolveCurrentTodo(
        items,
        dateCursor.date,
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
        currentDate: dateCursor.date,
        moveToPreviousDate,
        moveToToday,
        moveToNextDate,
        dayNavigationDirection: dateCursor.direction,
        items,
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
        items,
        isFetching,
        addTodo,
        updateTodo,
        removeTodo,
        moveTodoOneDayForward,
    } = useContext(Context);

    return {
        currentTodoIndex,
        setCurrentTodoIndex,
        items,
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
        dayNavigationDirection,
        moveToPreviousDate,
        moveToToday,
        moveToNextDate,
    } = useContext(Context);

    return {
        numberOfDaysDisplayed,
        currentDate,
        dayNavigationDirection,
        moveToPreviousDate,
        moveToToday,
        moveToNextDate,
    };
};
