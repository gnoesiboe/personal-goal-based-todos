import { TodoListItem } from '../../../model/todoListItem';
import { Action, ActionType } from '../model/actionTypes';
import { Dispatch, Reducer, useReducer } from 'react';
import { createStartOfToday } from '../../../utility/dateTimeUtilities';
import {
    applyMoveToNextDateModifier,
    applyMoveToPreviousDateModifier,
    applyMoveToTodayModifier,
} from '../stateModifiers/currentDateStateModifiers';
import {
    applyClearCurrentTodoModifier,
    applyMoveToNextTodoModifier,
    applyMoveToPreviousTodoModifier,
    applySelectTodoModifier,
} from '../stateModifiers/currentTodoIndexStateModifiers';
import {
    applyAddTodoModifier,
    applyLoadIncomingTodoListItemsModifier,
    applyRemoveCurrentTodoModifier,
    applyRemoveTodoModifier,
    applyUpdateTodoModifier,
} from '../stateModifiers/itemsStateModifiers';

export type DayNavigationDirection = 'forwards' | 'backwards';

export type DateCursor = {
    date: Date;
    direction: DayNavigationDirection;
};

export type TodoIndexCursor = number | null;

export type ItemsState = Record<string, TodoListItem[]> | null;

export type State = {
    dateCursor: DateCursor;
    currentTodoIndex: TodoIndexCursor;
    numberOfDaysDisplayed: number;
    items: ItemsState;
    isFetching: boolean;
};

type ReducerType = Reducer<State, Action>;

const reducer: ReducerType = (currentState, action) => {
    switch (action.type) {
        case ActionType.ChangeNumberOfDaysDisplayed:
            return {
                ...currentState,
                numberOfDaysDisplayed: action.numberOfDaysDisplayed,
            };

        case ActionType.MoveToPreviousDate:
            return applyMoveToPreviousDateModifier(currentState);

        case ActionType.MoveToNextDate:
            return applyMoveToNextDateModifier(currentState);

        case ActionType.MoveToToday:
            return applyMoveToTodayModifier(currentState);

        case ActionType.MoveToNextTodo:
            return applyMoveToNextTodoModifier(currentState);

        case ActionType.MoveToPreviousTodo:
            return applyMoveToPreviousTodoModifier(currentState);

        case ActionType.ClearCurrentTodo:
            return applyClearCurrentTodoModifier(currentState);

        case ActionType.SelectTodo:
            return applySelectTodoModifier(currentState, action);

        case ActionType.AddTodo:
            return applyAddTodoModifier(currentState, action);

        case ActionType.RemoveCurrentTodo:
            return applyRemoveCurrentTodoModifier(currentState);

        case ActionType.RemoveTodo:
            return applyRemoveTodoModifier(currentState, action);

        case ActionType.UpdateTodo:
            return applyUpdateTodoModifier(currentState, action);

        case ActionType.StartFetchingItems:
            return {
                ...currentState,
                isFetching: true,
            };

        case ActionType.StopFetchingItems:
            return {
                ...currentState,
                isFetching: false,
            };

        case ActionType.LoadIncomingTodoListItems:
            return applyLoadIncomingTodoListItemsModifier(currentState, action);

        default:
            throw new Error('Action not supported');
    }
};

const initialState: State = {
    dateCursor: {
        date: createStartOfToday(),
        direction: 'forwards',
    },
    currentTodoIndex: null,
    numberOfDaysDisplayed: 0,
    items: null,
    isFetching: false,
};

export const useTodoReducer = (): [State, Dispatch<Action>] => {
    const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);

    return [state, dispatch];
};
