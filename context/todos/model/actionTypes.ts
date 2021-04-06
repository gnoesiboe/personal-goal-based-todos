import { TodoListItem } from '../../../model/todoListItem';

export enum ActionType {
    MoveToPreviousDate = 'MoveToPreviousDate',
    MoveToNextDate = 'MoveToNextDate',
    MoveToNextCurrentDate = 'MoveToNextCurrentDate',
    MoveToPreviousCurrentDate = 'MoveToPreviousCurrentDate',
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
    ToggleHideDone = 'ToggleHideDone',
    ToggleHideWaiting = 'ToggleHideWaiting',
    ToggleHideEvening = 'ToggleHideEvening',
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

export interface MoveToNextCurrentDateAction extends BaseAction {
    type: ActionType.MoveToNextCurrentDate;
}

export interface MoveToPreviousCurrentDateAction extends BaseAction {
    type: ActionType.MoveToPreviousCurrentDate;
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
    id: string;
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
    backlogItems: TodoListItem[];
}

export interface ChangeNumberOfDaysDisplayedAction extends BaseAction {
    type: ActionType.ChangeNumberOfDaysDisplayed;
    numberOfDaysDisplayed: number;
}

export interface ToggleHideDoneAction extends BaseAction {
    type: ActionType.ToggleHideDone;
}

export interface ToggleHideWaitingAction extends BaseAction {
    type: ActionType.ToggleHideWaiting;
}

export interface ToggleHideEveningAction extends BaseAction {
    type: ActionType.ToggleHideEvening;
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
    | ChangeNumberOfDaysDisplayedAction
    | MoveToNextCurrentDateAction
    | MoveToPreviousCurrentDateAction
    | ToggleHideDoneAction
    | ToggleHideWaitingAction
    | ToggleHideEveningAction;
