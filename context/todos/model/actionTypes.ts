import { TodoListItem } from '../../../model/todoListItem';

export enum ActionType {
    MoveToPreviousDate = 'MoveToPreviousDate',
    MoveToNextDate = 'MoveToNextDate',
    MoveToDate = 'MoveToDate',
    MoveCurrentDateToToday = 'MoveCurrentDateToToday',
    MoveToNextTodo = 'MoveToNextTodo',
    MoveToPreviousTodo = 'MoveToPreviousTodo',
    ClearCurrentTodo = 'ClearCurrentTodo',
    SelectTodo = 'SelectTodo',
    AddTodo = 'AddTodo',
    RemoveCurrentTodo = 'RemoveCurrentTodo',
    RemoveTodo = 'RemoveTodo',
    UpdateTodo = 'UpdateTodo',
    StartFetchingItems = 'StartFetchingItems',
    StopFetchingItems = 'StopFetchingItems',
    LoadIncomingTodoListItems = 'LoadIncomingTodoListItems',
    ChangeNumberOfDaysDisplayed = 'ChangeNumberOfDaysDisplayed',
}

interface BaseAction {
    type: ActionType;
}

export interface MoveToPreviousDateAction extends BaseAction {
    type: ActionType.MoveToPreviousDate;
}

export interface MoveToNextDateAction extends BaseAction {
    type: ActionType.MoveToNextDate;
}

export interface MoveCurrentDateToTodayAction extends BaseAction {
    type: ActionType.MoveCurrentDateToToday;
}

export interface MoveToNextTodoAction extends BaseAction {
    type: ActionType.MoveToNextTodo;
}

export interface MoveToPreviousTodoAction extends BaseAction {
    type: ActionType.MoveToPreviousTodo;
}

export interface MoveToDateAction extends BaseAction {
    type: ActionType.MoveToDate;
    date: Date;
}

export interface ClearCurrentTodoAction extends BaseAction {
    type: ActionType.ClearCurrentTodo;
}

export interface SelectTodoAction extends BaseAction {
    type: ActionType.SelectTodo;
    index: number;
}

export interface AddTodoAction extends BaseAction {
    type: ActionType.AddTodo;
    todo: TodoListItem;
}

export interface RemoveCurrentTodoAction extends BaseAction {
    type: ActionType.RemoveCurrentTodo;
}

export interface RemoveTodoAction extends BaseAction {
    type: ActionType.RemoveTodo;
    id: string;
}

export interface UpdateTodoAction extends BaseAction {
    type: ActionType.UpdateTodo;
    updates: Partial<TodoListItem>;
    id: string;
}

export interface StartFetchingItemsAction extends BaseAction {
    type: ActionType.StartFetchingItems;
}

export interface StopFetchingItemsAction extends BaseAction {
    type: ActionType.StopFetchingItems;
}

export interface LoadIncomingTodoListItemsAction extends BaseAction {
    type: ActionType.LoadIncomingTodoListItems;
    items: TodoListItem[];
}

export interface ChangeNumberOfDaysDisplayedAction extends BaseAction {
    type: ActionType.ChangeNumberOfDaysDisplayed;
    numberOfDaysDisplayed: number;
}

export type Action =
    | MoveToPreviousDateAction
    | MoveToNextDateAction
    | MoveCurrentDateToTodayAction
    | MoveToDateAction
    | MoveToNextTodoAction
    | MoveToPreviousTodoAction
    | ClearCurrentTodoAction
    | SelectTodoAction
    | AddTodoAction
    | RemoveCurrentTodoAction
    | UpdateTodoAction
    | StartFetchingItemsAction
    | StopFetchingItemsAction
    | LoadIncomingTodoListItemsAction
    | RemoveTodoAction
    | ChangeNumberOfDaysDisplayedAction;
