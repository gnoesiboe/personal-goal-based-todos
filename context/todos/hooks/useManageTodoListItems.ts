import useFetchTodoListItems from './useFetchTodoListItems';
import useModifyTodoCollection from './useModifyTodoCollection';
import { Dispatch } from 'react';
import { Action } from '../model/actionTypes';
import { ItemsState } from '../reducers/todoReducer';

export default function useManageTodoListItems(
    currentDate: Date,
    numberOfDaysDisplayed: number,
    items: ItemsState,
    dispatch: Dispatch<Action>,
) {
    const { fetchTodos, refetchTodos } = useFetchTodoListItems(
        currentDate,
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
        dispatch,
    );

    return {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        removeTodo,
        refetchTodos,
    };
}
