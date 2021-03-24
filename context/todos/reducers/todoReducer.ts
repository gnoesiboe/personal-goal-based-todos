import { TodoListItem } from '../../../model/todoListItem';
import { Action, ActionType } from '../model/actionTypes';
import { Dispatch, Reducer, useReducer } from 'react';
import { createStartOfToday } from '../../../utility/dateTimeUtilities';
import {
    applyMoveToDateModifier,
    applyMoveToNextDateModifier,
    applyMoveToPreviousDateModifier,
    applyMoveCurrentDateToTodayModifier,
    applyMoveToNextCurrentDateModifier,
    applyMoveToPreviousCurrentDateModifier,
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
import { applyToggleHideDoneActionModifier } from '../stateModifiers/filterModifiers';

export type DayNavigationDirection = 'forwards' | 'backwards';

export type DateCursor = {
    currentDate: Date;
    firstVisibleDate: Date;
    direction: DayNavigationDirection;
};

export type TodoIndexCursor = number | null;

export type ItemsState = Record<string, TodoListItem[]> | null;

export type AppliedFilters = {
    hideDone: boolean;
};

export type State = {
    dateCursor: DateCursor;
    currentTodoIndex: TodoIndexCursor;
    numberOfDaysDisplayed: number;
    items: ItemsState;
    filteredItems: ItemsState;
    backlogItems: ItemsState;
    isFetching: boolean;
    appliedFilters: AppliedFilters;
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

        case ActionType.MoveToNextCurrentDate:
            return applyMoveToNextCurrentDateModifier(currentState);

        case ActionType.MoveToPreviousCurrentDate:
            return applyMoveToPreviousCurrentDateModifier(currentState);

        case ActionType.MoveToDate:
            return applyMoveToDateModifier(currentState, action);

        case ActionType.MoveCurrentDateToToday:
            return applyMoveCurrentDateToTodayModifier(currentState);

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

        case ActionType.ToggleHideDone:
            return applyToggleHideDoneActionModifier(currentState);

        default:
            throw new Error('Action not supported');
    }
};

const initialState: State = {
    dateCursor: {
        currentDate: createStartOfToday(),
        firstVisibleDate: createStartOfToday(),
        direction: 'forwards',
    },
    currentTodoIndex: null,
    numberOfDaysDisplayed: 0,
    items: null,
    filteredItems: null,
    backlogItems: null,
    isFetching: false,
    appliedFilters: {
        hideDone: false,
    },
};

export const useTodoReducer = (): [State, Dispatch<Action>] => {
    const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);

    return [state, dispatch];
};
